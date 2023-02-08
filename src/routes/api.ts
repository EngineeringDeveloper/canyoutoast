const stravaApiURL = 'https://www.strava.com/api/v3';
const stravaOAuthURL = 'https://www.strava.com/oauth/authorize';
const stravaTokenURL = 'https://www.strava.com/oauth/token';
const client_id = '44340';
const redirect_uri =
	process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:5173' : 'canyoutoast.com';

// get cookie on server load

//** Authenticates Athlete from the token provided by OAuth */
export async function stravaAuthenticate(token: string, SECRET_clientSecret: string) {
	console.log('Secret', SECRET_clientSecret);
	const tokenURL = new URL(stravaTokenURL);
	tokenURL.searchParams.append('client_id', client_id);
	tokenURL.searchParams.append('client_secret', SECRET_clientSecret);
	tokenURL.searchParams.append('code', token);
	tokenURL.searchParams.append('grant_type', 'authorization_code');
	console.log(tokenURL.href);
	const response = await fetch(tokenURL, {
		method: 'POST',
	});

	if (!response.ok) {
        console.error(response.statusText);
        // todo Resolve request types
		return false;
	}

	const responseData: { refresh_token: string; access_token: string } = await response.json();
	console.log(responseData);
	return { access_token: responseData.access_token, refresh_token: responseData.refresh_token };
}

//** Redirects the User to authorize with Strava */
export function stravaOAuth() {
	const authURL = new URL(stravaOAuthURL);
	authURL.searchParams.append('client_id', client_id);
	authURL.searchParams.append('redirect_uri', redirect_uri);
	authURL.searchParams.append('response_type', 'code');
	authURL.searchParams.append('approval_prompt', 'auto');
	authURL.searchParams.append('scope', 'profile:read_all');
	window.location.assign(authURL);
}

export class Strava {
	client_id = '44340';
	stravaApiURL = 'https://www.strava.com/api/v3';
	refresh_token: string;
	access_token: string;

	constructor(access_token: string, refresh_token: string) {
		this.access_token = access_token;
		this.refresh_token = refresh_token;
	}
}
