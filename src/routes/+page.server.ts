// import { page } from '$app/stores';
// import { get } from 'svelte/store';
import type { PageLoad } from './$types';
import { stravaAuthenticate } from './api';
import { SECRET_clientSecret} from '$env/static/private';

export const load = (async ({ cookies, url }) => {
	// const pageParams = get(page).url.searchParams;
	if (url.searchParams.has("code")) {
		const authStatus = await stravaAuthenticate(url.searchParams.get("code"), SECRET_clientSecret)
		console.log(authStatus)
		if (authStatus) {
			const { access_token, refresh_token } = authStatus
			return {
				access_token, refresh_token, status: true
			}
		}
		return {
			status: false
		}
	}
	return {
		status: false
	};
}) satisfies PageLoad;
