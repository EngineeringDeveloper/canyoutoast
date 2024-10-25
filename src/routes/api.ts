import type {
	Activity,
	Athlete,
	fullAthlete,
	wattsStream,
	effort,
	effortDetails
} from '$lib/types';

const stravaApiURL = 'https://www.strava.com/api/v3';
const stravaOAuthURL = 'https://www.strava.com/oauth/authorize';
const stravaTokenURL = 'https://www.strava.com/oauth/token';
const client_id = import.meta.env.DEV ? '102492' : '44340';
const redirect_uri = import.meta.env.DEV ? 'http://127.0.0.1:5173' : 'https://www.canyoutoast.com/';

// get cookie on server load

//** Authenticates Athlete from the token provided by OAuth */
export async function stravaAuthenticate(
	token: string,
	SECRET_clientSecret: string,
	grant_type: 'authorization_code' | 'refresh_token'
) {
	const tokenURL = new URL(stravaTokenURL);
	tokenURL.searchParams.append('client_id', client_id);
	tokenURL.searchParams.append('client_secret', SECRET_clientSecret);
	tokenURL.searchParams.append(grant_type == "authorization_code"? "code": grant_type, token);
	tokenURL.searchParams.append('grant_type', grant_type);
	console.log(tokenURL.toString())
	const response = await fetch(tokenURL, {
		method: 'POST'
	});

	if (!response.ok) {
		console.error(response.statusText);
		console.error(JSON.stringify(response))
		// todo Resolve request types
		return false;
	}
	// Todo Resolve Authentication errors?

	const responseData: AuthenticatedResponse = await response.json();
	// console.log(responseData);
	return {
		access_token: responseData.access_token,
		refresh_token: responseData.refresh_token,
		expires_at: responseData.expires_at
	};
}

//** Redirects the User to authorize with Strava */
export function stravaOAuth() {
	const authURL = new URL(stravaOAuthURL);
	authURL.searchParams.append('client_id', client_id);
	authURL.searchParams.append('redirect_uri', redirect_uri);
	authURL.searchParams.append('response_type', 'code');
	authURL.searchParams.append('approval_prompt', 'auto');
	authURL.searchParams.append('scope', 'activity:read_all'); // 'profile:read_all,activity:read_all'
	window.location.assign(authURL);
}
export interface AuthenticatedResponse {
	token_type: string;
	expires_at: number;
	expires_in: number;
	refresh_token: string;
	access_token: string;
	athlete: Athlete;
}

export class Strava {
	client_id = '44340';
	stravaApiURL = new URL('https://www.strava.com/api/v3/');
	refresh_token: string;
	access_token: string;
	requestCount = 0;

	constructor(access_token: string, refresh_token: string) {
		this.access_token = access_token;
		this.refresh_token = refresh_token;
	}

	async getAthlete(): Promise<fullAthlete> {
		const athleteURL = new URL('athlete', this.stravaApiURL);
		return await this.authGET(athleteURL) as fullAthlete
	}

	async getBestEffortlast10(): Promise<effortDetails> {
		// 400W 30s moving average
		const powerMinimum = 350;
		const period = 30;

		const activities = Object.values(await this.last6WeeksActivities()).reverse();
		
		// console.log('activities', activities);
		const athlete= await this.getAthlete() 
		const name = athlete.firstname;
		const id = athlete.id;
		const bestEfforts: effortDetails[] = [];
		let i = 0
		for (const activity of activities) {
			if (activity.device_watts) {
				// or other handeler?
				// "you need power to toast bread"
				const watts = await this.getActivityWattsStreams(String(activity.id));
				// console.log(activity.id, watts);
				const bestRideEffort = findBestEffort(watts[0].data, powerMinimum, period);
				bestEfforts.push({
					id: activity.id,
					name,
					athleteID: id,
					...bestRideEffort
				});
				i ++
			}
			if (i == 10) {
				break
			}
		}
		// console.log('best', bestEfforts);
		if (bestEfforts.length == 0) {
			return {
				power: 0,
				timeS: 0,
				joules: 0,
				id: null,
				name,
				athleteID: id
			} as effortDetails;
		}

		const idxBest = idxMax(bestEfforts.map((x) => x.joules));
		return bestEfforts[idxBest];
	}

	async getActivityWattsStreams(activityID: string): Promise<wattsStream> {
		const athleteURL = new URL(`activities/${activityID}/streams`, this.stravaApiURL);
		athleteURL.searchParams.append('keys', 'watts');
		athleteURL.searchParams.append('keys_by_type', 'true');
		return await this.authGET(athleteURL) as wattsStream
	}

	async getMaxWatts() {
		const activities = await this.last6WeeksActivities();
		const hasPowerData = activities.filter((act) => act.device_watts);

		const bestPower = hasPowerData.reduce((prev, current) => {
			if (prev.max_watts > current.max_watts) {
				return prev;
			}
			return current;
		});

		return bestPower.max_watts;
	}

	async last6WeeksActivities() {
		const sixWeeksInSeconds = 6 * 7 * 24 * 60 * 60;
		return (await this.listAthleteActivities(Date.now() / 1000 - sixWeeksInSeconds));
	}

	async listAthleteActivities(since: EpochTimeStamp) {
		const activitiesURL = new URL('athlete/activities', this.stravaApiURL);
		activitiesURL.searchParams.append('after', since.toFixed(0));
		activitiesURL.searchParams.append('per_page', "84");
		// How to deal with Pages of activities
		return await this.authGET(activitiesURL) as Activity[]
	}

	async authGET(url: URL) {
		// console.log(url);
		const response = await fetch(url, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${this.access_token}`
			}
		});
		this.requestCount += 1;
		// console.log('Request Count', this.requestCount);

		// this functiom will handle response types
		if (response.ok) {
			return await response.json()
		}

		// console.log(response.status, response.statusText);
		let message = ""
		switch (response.status) {
			case 429:
				// too many requests
				message = 'too many requests, please Wait 15 Minutes'
				break
			default:
				message = `${response.status}: ${response.statusText}`
		}
		throw new Error(message)
	}
}

function findBestEffort(watts: number[], powerMinimum: number, period: number): effort {
	// create the moving average Power
	// padding the extents with 0's
	const movingAverage = watts.map((value, index, array) => {
		// ends cut to 0
		if (index < period - 1) {
			return 0;
		}
		if (index > array.length - period) {
			return 0;
		}
		let total = 0;
		array.slice(index - period, index + 1).forEach((value) => (total += value));
		return total / period;
	});

	const effortValue: number[] = [];
	const efforts: effort[] = [];
	let thisEffort: number[] = [];
	// Split the movingAverage into efforts > powerMinimum
	movingAverage.forEach((value) => {
		// push to this effort
		if (value >= powerMinimum) {
			thisEffort.push(value);
			return;
		}
		// effort has ended
		let effortJoules = 0;
		// because Watts * seconds = Joules and sampling is 1hz
		thisEffort.forEach((value) => (effortJoules += value));
		effortValue.push(effortJoules);
		efforts.push({
			power: effortJoules / thisEffort.length,
			timeS: thisEffort.length,
			joules: effortJoules
		});
		thisEffort = [];
	});

	if (effortValue.length == 0) {
		return {
			power: 0,
			timeS: 0,
			joules: 0
		};
	}
	// return the best effort
	const bestEffort = idxMax(effortValue);
	return efforts[bestEffort];
}

function max(array: number[]) {
	return array.reduce((prev, current) => {
		return prev > current ? prev : current;
	});
}

function idxMax(array: number[]) {
	return array.reduce((prev, current, currentIndex, array) => {
		return current > array[prev] ? currentIndex : prev;
	}, 0);
}
