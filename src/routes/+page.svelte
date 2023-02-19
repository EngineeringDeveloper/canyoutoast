<script lang="ts">
	import type { binLength as BinLength, effortDetails } from '$lib/types';
	import { Strava, stravaOAuth } from './api';

	import type { PageData } from './$types';
	import Toast from '../lib/toast.svelte';
	import Toaster from '../lib/toaster.svelte';
	import type { ComponentProps } from 'svelte';
	import Footer from '$lib/footer.svelte';

	export let data: PageData;
	const bins: BinLength = [
		30000, 43200, 64800, 86400, 97200, 108000, 129600, 151200, 162000, 172800, 194400
	];

	let api: Strava;

	let effort: effortDetails = {power: 0, joules:0, timeS:0, id: null};
	// effort = { power : 500, joules :60000, timeS:120, id: 8581239719}

	let status: ComponentProps<Toaster>['status'] = 'waiting';

	let devAllow = import.meta.env.PROD;

	if (data.status) {
		if (devAllow) {
			runMain();
		}
	}

	function runMain() {
		status = 'loading';
		api = new Strava(data.access_token, data.refresh_token);
		api.getBestEffortlast30().then((bestEffort) => {
			// svelte force update on object
			api = api;
			console.log('Best Energy', bestEffort);
			effort = bestEffort;
			setTimeout(() => {
				status = 'finished';
				setTimeout(() => {
					status = 'display';
				}, 2000);
			}, 1000);
		});
	}
	function demo() {
		status = 'waiting';
		setTimeout(() => {
			status = 'loading';
			setTimeout(() => {
				status = 'finished';
				setTimeout(() => {
					status = 'display';
				}, 1000);
			}, 3000);
		}, 1000);
	}

	function finish_and_show() {
		status = 'finished';
		setTimeout(() => {
			status = 'display';
		}, 1000);
	}
</script>

{#if import.meta.env.DEV}
	<div class="absolute grid grid-flow-row top-0 left-0 max-w-screen break-words z-10">
		<div class="break-words max-w-screen w-screen">Page Data: {JSON.stringify(data)}</div>
		<div class="break-words max-w-screen w-screen">Api: {JSON.stringify(api, null)}</div>
		<div class="break-words max-w-screen w-screen">Status: {status}</div>
		<div class="break-words max-w-screen w-screen">
			Energy: <input type="number" bind:value={effort} />
		</div>
		<div class="break-words max-w-screen w-screen">
			run API: <input type="checkbox" bind:value={devAllow} on:change={runMain} />
		</div>
		<div class="break-words max-w-screen w-screen">
			<button on:click={() => (status = 'waiting')}>waiting</button>
			<button on:click={() => (status = 'loading')}>loading</button>
			<button on:click={() => (status = 'finished')}>finished</button>
			<button on:click={() => (status = 'display')}>display</button>
			<button on:click={finish_and_show}>Pop</button>
			<button on:click={demo}>All</button>
		</div>
	</div>
{/if}

<div class="grid place-items-center h-screen relative z-0">
	<Toaster {status}><Toast {effort} {bins} /></Toaster>
	{#if !data.status}
		<div class="animate-bounce mx-auto mt-52 z-20">
			<img
				class="cursor-pointer"
				style="width: 60rem;"
				src="images/btn_strava_connectwith_orange.svg"
				on:click={stravaOAuth}
				on:keypress={(key) => {
					stravaOAuth();
				}}
				alt={'Connect With Strava'}
			/>
			{#if data.message}
				<div class="text-center">{data.message}</div>
			{/if}
		</div>
	{/if}
	<Footer />
</div>

<style>
</style>
