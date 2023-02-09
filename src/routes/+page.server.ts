import type { PageLoad } from './$types';
import { stravaAuthenticate } from './api';
import { SECRET_clientSecret} from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';

export const load = (async ({ cookies, url }: {cookies:Cookies, url:URL}) => {
	// const pageParams = get(page).url.searchParams;

	// if redirected from o-auth code will be in params
	if (url.searchParams.has("code")) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const authStatus = await stravaAuthenticate(url.searchParams.get("code")!, SECRET_clientSecret, 'authorization_code')
		console.log(authStatus)
		if (authStatus) {
			// Front end can create an API object
			const { access_token, refresh_token, expires_at } = authStatus
			cookies.set("access_token", access_token)
			cookies.set("refresh_token", refresh_token)
			cookies.set("expires_at", String(expires_at))

			return {
				access_token, refresh_token, status: true, message: null
			}
		}

		// Notify User Authentication failed
		return {
			status: false,
			message: "Authentication Failed"
		}
	} 
	// try and get data from cookie
	const access_token = cookies.get("access_token")
	if (access_token) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const refresh_token = cookies.get("refresh_token")!

		if (Number(cookies.get("expires_at")) < Date.now()) {
			const authStatus = await stravaAuthenticate(refresh_token, SECRET_clientSecret, 'refresh_token')
			console.log(authStatus)
			if (authStatus) {
				// Front end can create an API object
				const { access_token, refresh_token, expires_at } = authStatus
				cookies.set("access_token", access_token)
				cookies.set("refresh_token", refresh_token)
				cookies.set("expires_at", String(expires_at))

				return {
					access_token, refresh_token, status: true, message: null
				}
			}

			// Notify User Authentication failed
			return {
				status: false,
				message: "Refresh of Strava Authentication failed"
			}
		}
		return {access_token, refresh_token, status: true}
	}
	
	// User needs to OAuth
	return {
		status: false, message: null
	};
}) satisfies PageLoad;
