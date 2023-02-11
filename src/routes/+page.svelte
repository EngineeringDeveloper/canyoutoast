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
	<!-- {#await api.getAthlete()}
		<SyncLoader />
	{:then data}
		<img src={data.profile} alt={'Athlete Profile Picture'} style="border-radius: 50%;" />
	{:catch error}
		<div>{error}</div>
	{/await}
	<br />
	{#await api.getMaxWatts()}
		<SyncLoader />
	{:then power}
		<Toast value={power} bins={bins}></Toast>
	{:catch error}
		<div>{error}</div>
	{/await} -->
	<div class="w-screen h-screen flex">
		<Toaster><Toast value={129599} {bins} /></Toaster>
	</div>
{:else}
	<button type="button" on:click={stravaOAuth}>Authenticate with Strava</button>
{/if}

<style>
</style>
