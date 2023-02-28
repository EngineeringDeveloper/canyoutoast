/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { PageLoad } from './$types';
import { stravaAuthenticate } from './api';
import { SECRET_clientSecret } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { effortURLParams } from '$lib/types';

export const load = (async ({ cookies, url }: { cookies: Cookies; url: URL }) => {
	let data = {};
	if (url.searchParams.has('obj')) {
		const effortObjectData: effortURLParams = JSON.parse(url.searchParams.get('obj')!);
		const metaData = {
			title: `${effortObjectData.name} just toasted with ${effortObjectData.power}`,

			image: `/images/toast/${effortObjectData.bin}.png`
		}
		data = {
			metaData,
			...data
		};
	}

	// try and get data from cookie
	const access_token = cookies.get('access_token');
	if (access_token) {
		console.log('Found Cookie with access token attempting authentication');
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const refresh_token = cookies.get('refresh_token')!;
		const expires_at = Number(cookies.get('expires_at'));

		console.log('Expires At:', expires_at);
		if (expires_at < Date.now() / 1000) {
			console.log('Token expired:', expires_at - Date.now() / 1000);
			const authStatus = await stravaAuthenticate(
				refresh_token,
				SECRET_clientSecret,
				'refresh_token'
			);
			console.log(authStatus);
			if (authStatus) {
				// Front end can create an API object
				const { access_token, refresh_token, expires_at } = authStatus;
				setCookies(cookies, access_token, refresh_token, expires_at);
				data = {
					...data,
					access_token,
					refresh_token,
					status: true,
					message: null
				};
				return data;
			}

			// Notify User Authentication failed
			data = {
				...data,
				status: false,
				message: 'Refresh of Strava Authentication failed'
			};
			return data;
		}
		data = {
			data,
			access_token,
			refresh_token,
			status: true
		};
		return data;
	}

	// if redirected from o-auth code will be in params
	if (url.searchParams.has('code')) {
		console.log('Detected OAuth Code, Trading for access_token');
		console.log(url.searchParams.entries());
		//check the scope
		const scope = url.searchParams.get('scope');
		// 'read,activity:read_all,profile:read_all'
		if (!scope?.split(',').find((v) => v == 'activity:read_all')) {
			data = {
				...data,
				status: false,
				message: 'User did not allow read permission'
			};
			return data;
		}

		const authStatus = await stravaAuthenticate(
			url.searchParams.get('code')!,
			SECRET_clientSecret,
			'authorization_code'
		);
		console.log(authStatus);
		if (authStatus) {
			// Front end can create an API object
			const { access_token, refresh_token, expires_at } = authStatus;
			setCookies(cookies, access_token, refresh_token, expires_at);
			data = {
				...data,
				access_token,
				refresh_token,
				status: true,
				message: null
			};

			return data;
		}

		// Notify User Authentication failed
		data = {
			...data,
			status: false,
			message: 'Authentication Failed'
		};

		return data;
	}

	// User needs to OAuth
	console.log('No authentication avaliable');
	data = {
		...data,
		status: false,
		message: null
	};
	return data;
}) satisfies PageLoad;

function setCookies(
	cookies: Cookies,
	access_token: string,
	refresh_token: string,
	expires_at: number
) {
	cookies.set('access_token', access_token);
	cookies.set('refresh_token', refresh_token);
	cookies.set('expires_at', String(expires_at));
}
