import type { Activity, Athlete, fullAthlete } from '$lib/types';

const stravaApiURL = 'https://www.strava.com/api/v3';
const stravaOAuthURL = 'https://www.strava.com/oauth/authorize';
const stravaTokenURL = 'https://www.strava.com/oauth/token';
const client_id = '44340';
const redirect_uri =
	process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:5173' : 'canyoutoast.com';

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
	tokenURL.searchParams.append('code', token);
	tokenURL.searchParams.append('grant_type', grant_type);
	const response = await fetch(tokenURL, {
		method: 'POST'
	});

	if (!response.ok) {
		console.error(response.statusText);
		// todo Resolve request types
		return false;
	}
	// Todo Resolve Authentication errors?

	const responseData: AuthenticatedResponse = await response.json();
	console.log(responseData);
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
	authURL.searchParams.append('scope', 'profile:read_all,activity:read_all');
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

	constructor(access_token: string, refresh_token: string) {
		this.access_token = access_token;
		this.refresh_token = refresh_token;
	}

	async getAthlete(): Promise<fullAthlete> {
		const athleteURL = new URL('athlete', this.stravaApiURL);
		return await this.authGET(athleteURL);
	}

	async getMaxWatts() {
		const activities = await this.last6WeeksActivities()
		const hasPowerData = activities.filter((act) => act.device_watts)

		const bestPower = hasPowerData.reduce((prev, current) => {
			if (prev.max_watts > current.max_watts) {
				return prev
			}
			return current
		})

		return bestPower.max_watts
	}

	async last6WeeksActivities(): Promise<Activity[]> {
		const sixWeeksInSeconds = 6 * 7 * 24 * 60 * 60;
		return await this.listAthleteActivities(Date.now() / 1000 - sixWeeksInSeconds);
	}

	async listAthleteActivities(since: EpochTimeStamp) {
		const activitiesURL = new URL('athlete/activities', this.stravaApiURL);
		activitiesURL.searchParams.append('after', since.toFixed(0));
		// How to deal with Pages of activities
		return await this.authGET(activitiesURL)
	}

	async authGET(url: URL) {
		console.log(url);
		const response = await fetch(url, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${this.access_token}`
			}
		});

		if (response.ok) {
			return await response.json();
		}
		
		console.log(response)
	}
}
