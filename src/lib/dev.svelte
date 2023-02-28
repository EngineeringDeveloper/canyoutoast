<script lang="ts">
	import type Toaster from '$lib/toaster.svelte';
	import type { ComponentProps } from 'svelte';

	export let status: ComponentProps<Toaster>['status'];
	export let effort;
	export let api;
	export let data;
	export let devAllow: boolean;
	export let runMain: () => void;


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

<style>
</style>

