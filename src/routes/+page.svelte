<script lang="ts">

	import type { binLength as BinLength, effortDetails } from '$lib/types';
	import type { PageData } from './$types';
	import type { ComponentProps } from 'svelte';
	
	import { Strava, stravaOAuth } from './api';
	
	import Toast from '$lib/toast.svelte';
	import Toaster from '../lib/toaster.svelte';
	import Footer from '$lib/footer.svelte';
	import Meta from '$lib/meta.svelte';
	import Dev from '$lib/dev.svelte';
	import { loaded } from '$lib/toastStore';

	export let data: PageData;
	const bins: BinLength = [
		30000, 43200, 64800, 86400, 97200, 108000, 129600, 151200, 162000, 172800, 194400
	];
	
	let api: Strava;
	
	let effort: effortDetails = {power: 0, joules:0, timeS:0, id: null, name: null};
	// dev settings
	// data.status = true
	// effort = { power : 500, joules :60000, timeS:120, id: 8581239719, name: "Ryan"}

	let status: ComponentProps<Toaster>['status'] = 'waiting';

	let devAllow = import.meta.env.PROD;
	// let devAllow = true;
	if (data.status) {
		if (devAllow) {
			runMain();
		}
	}
	loaded.subscribe((toastLoaded) => {
		if (toastLoaded && status == "loading") {
			status = "finished"
			setTimeout(() => {
						setTimeout(() => {
							status = 'display';
						}, 2000);
					}, 1000);
		}
	})

	function runMain() {
		status = 'loading';
		api = new Strava(data.access_token, data.refresh_token);
		api.getBestEffortlast30().then((bestEffort) => {
			// svelte force update on object
			api = api;
			// console.log('Best Energy', bestEffort);
			effort = bestEffort;
			if ($loaded) {
				status = 'finished';
				setTimeout(() => {
					setTimeout(() => {
						status = 'display';
					}, 2000);
				}, 1000);
			}
		});
	}

	const metaData: ComponentProps<Meta> = {
		title: 'Can you Toast?',
		description: 'How well can you heat your Toast on a bike?'
	}

	if (data.metaData) {
		metaData.title = data.metaData.title
		metaData.description = data.metaData.description
		metaData.image = data.metaData.image
	}

</script>

<Meta {...metaData}/>

<Dev bind:status bind:effort bind:api bind:data bind:devAllow runMain={runMain} />

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
