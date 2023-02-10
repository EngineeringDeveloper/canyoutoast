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
	}

	const bins: BinLength = [300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1300, 1400];
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
		<Toaster><Toast value={60} bins={[1, 2, 3, 4, 5, 6, 7, 60, 200, 300, 1000]} /></Toaster>
	</div>
{:else}
	<button type="button" on:click={stravaOAuth}>Authenticate with Strava</button>
{/if}

<style>
</style>
