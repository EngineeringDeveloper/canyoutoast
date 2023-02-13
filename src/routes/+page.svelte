<script lang="ts">
	import type { binLength as BinLength } from '$lib/types';
	import { Strava, stravaOAuth } from './api';
	import { SyncLoader } from 'svelte-loading-spinners';

	import type { PageData } from './$types';
	import Toast from '../lib/toast.svelte';
	import Toaster from '../lib/toaster.svelte';
	import type { ComponentProps } from 'svelte';

	export let data: PageData;
	const bins: BinLength = [
		30000, 43200, 64800, 86400, 97200, 108000, 129600, 151200, 162000, 172800, 194400
	];

	let api: Strava;

	let energy = 0;
	let status: ComponentProps<Toaster>['status'] = 'waiting';
		
	if (data.status) {
		status = 'loading';
		api = new Strava(data.access_token, data.refresh_token);
		api.getBestEffortlast30().then((value) => {
			energy = value;
			status = 'finished';
			setTimeout(() => {
				status = 'display';
			}, 1000);
		});
	}

</script>

<div class="grid place-items-center h-screen">
	<Toaster {status}><Toast value={energy} {bins} /></Toaster>
	{#if !data.status}
		<img
			style="width: 60rem;"
			class="animate-bounce mx-auto mt-52"
			src="images/btn_strava_connectwith_orange.svg"
			on:click={stravaOAuth}
			on:keypress={(key) => {
				stravaOAuth();
			}}
			alt={'Connect With Strava'}
		/>
	{/if}
</div>

<style>
</style>
