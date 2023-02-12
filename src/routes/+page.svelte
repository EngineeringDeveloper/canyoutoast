<script lang="ts">
	import type { binLength as BinLength } from '$lib/types';
	import { Strava, stravaOAuth } from './api';
	import { SyncLoader } from 'svelte-loading-spinners';

	import type { PageData } from './$types';
	import Toast from '../lib/toast.svelte';
	import Toaster from '../lib/toaster.svelte';

	export let data: PageData;

	let api: Strava;
	if (data.status) {
		api = new Strava(data.access_token, data.refresh_token);
		console.log(api)
		console.log(api.getActivityWattsStreams("8542979102"))
	}

	const bins: BinLength = [
		30000, 43200, 64800, 86400, 97200, 108000, 129600, 151200, 162000, 172800, 194400
];
</script>

{#if data.status}
	<!-- {#await api.getBestEffortlast30()}
		<SyncLoader />
	{:then data}
		<div class="w-screen h-screen flex">
			<Toaster><Toast value={data} {bins} /></Toaster>
		</div>
	{:catch error}
		<div>{error}</div>
	{/await} -->
			<Toaster><Toast value={100000} {bins} /></Toaster>
{:else}
	<img class= "animate-bounce" src="images/btn_strava_connectwith_orange.svg" on:click={stravaOAuth} on:keypress={(key) => {stravaOAuth()}} alt={"Connect With Strava"}/>
{/if}

<style>
</style>
