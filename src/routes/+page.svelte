<script lang="ts">
	import type { binLength as BinLength } from '$lib/types';
	import { Strava, stravaOAuth } from './api';

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
	
	let devAllow = import.meta.env.PROD

	if (data.status) {
		if (devAllow) {
			runMain();
		}
	}

	function runMain() {
		setTimeout(() => {
			status = 'loading';
			api = new Strava(data.access_token, data.refresh_token);
			api.getBestEffortlast30().then((value) => {
				// svelte force update on object
				api = api;
				console.log('Best Energy', value);
				energy = value;
				setTimeout(() => {
					status = 'finished';
					setTimeout(() => {
						status = 'display';
					}, 1000);
				}, 1000);
			});
		}, 1000);
	}
	function demo() {
        status = "waiting"
        setTimeout(() => {
            status = "loading"
            setTimeout(() => {
                status = "finished"
                setTimeout(() => {  
                    status = "display"
                }, 1000)
            }, 3000)
        }, 1000)
    }

    function finish_and_show() {
        status = "finished"
        setTimeout(() => {  
            status = "display"
        }, 1000)
    }
</script>

{#if import.meta.env.DEV}
	<div class="absolute top-0 left-0 mx-5 my-5 px-5 w-96">
		<div>Page Data: {JSON.stringify(data)}</div>
		<div>Api: {JSON.stringify(api, null, '\t')}</div>
		<div>Status: {status}</div>
		<div>Energy: <input type="number" bind:value={energy} /></div>
		<div>run API: <input type="checkbox" bind:value={devAllow} on:change={runMain} /></div>
		<div >
			<button on:click={ ()=> status = "waiting"}>waiting</button>
			<button on:click={ ()=> status = "loading"}>loading</button>
			<button on:click={ ()=> status = "finished"}>finished</button>
			<button on:click={ ()=> status = "display"}>display</button>
			<button on:click={finish_and_show}>Pop</button>
			<button on:click={demo}>All</button>
		</div>
	</div>
{/if}

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
