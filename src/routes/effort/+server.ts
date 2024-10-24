import { effort, effortDetails } from '$lib/types';
import type { RequestHandler } from './$types';

import { SECRET_KV_REST_API_TOKEN, SECRET_KV_REST_API_URL } from '$env/static/private'
// import { Redis } from '@upstash/redis'

import { createClient } from 'redis';
import { json } from '@sveltejs/kit';


export async function POST({ request }) {
	const effort: effortDetails = await request.json();
	console.log(effort)

	const client = createClient({
		password: SECRET_KV_REST_API_TOKEN,
		socket: {
			host: SECRET_KV_REST_API_URL,
			port: 13927
		}
	});
	client.connect()
	
	await client.set("test", "{power:10, test:100}")
	console.log(await client.get("test"))

	return json( effort , { status: 201 });
}
