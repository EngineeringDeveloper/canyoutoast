<script lang="ts">
	import type { binLength, effortDetails, effortURLParams } from '$lib/types';
	import Share from './share.svelte';

	export let effort: effortDetails;
	export let bins: binLength;

	interface toast {
		src: string;
		text: string;
		altText: string;
		idx: number;
	}
	// Places the value in one of 11 bins and decides which picture of toast to select based off that.
	// First bin is <= value
	// values exceeding the top bin value are handled
	const toastSrc: toast[] = [
		{ text: 'Thats just Bread', altText: 'Thats just Bread', src: '/images/toast/0.png', idx: 0 }, // 0 Bread
		{ text: "I guess it's warm?", altText: 'Warmed Bread', src: '/images/toast/1.png', idx: 1 },
		{
			text: 'If you look closely',
			altText: 'Slightly cooked if you look closely',
			src: '/images/toast/2.png',
			idx: 2
		},
		{ text: 'Just about!', altText: 'Just about toast', src: '/images/toast/3.png', idx: 3 }, // 3
		{
			text: 'Keep Trying',
			altText: 'almost toast keep trying',
			src: '/images/toast/4.png',
			idx: 4
		},
		{ text: 'Not quite there', altText: 'Almost Done Toast', src: '/images/toast/5.png', idx: 5 },
		{ text: 'Now thats Toast', altText: 'Builders Brew Toast', src: '/images/toast/6.png', idx: 6 }, // 6
		{
			text: 'A little over done',
			altText: 'a litte overdone Toast',
			src: '/images/toast/7.png',
			idx: 7
		},
		{ text: "That'll do", altText: 'overdone Toast', src: '/images/toast/8.png', idx: 8 },
		{ text: 'Half way to dust', altText: 'half burnt', src: '/images/toast/9.png', idx: 9 },
		{ text: 'Maybe edible', altText: 'almost burnt', src: '/images/toast/10.png', idx: 10 }, // 10
		{ text: 'On Fire!', altText: 'Toast on Fire', src: '/images/toast/11.png', idx: 11 } // Burnt
	];

	function binValue(value: number, bins: binLength) {
		for (const [i, bin] of bins.entries()) {
			// return the index of the bin which the value sits
			switch (i) {
				case 0:
					if (value <= bin) {
						return i;
					}
				default:
					if (value < bin) {
						return i;
					}
			}
		}
		// Greater than all bins
		return 11;
	}

	function secondsToMMSS(number: number) {
		const mins = number / 60;
		const seconds = number % 60;

		let str = '';
		if (mins > 0) {
			str += mins.toFixed(0);
			str += 'Min';
			if (mins >= 2) {
				str += 's';
			}
			str += ' ';
		}
		str += seconds.toFixed(0);
		str += 's';
		return str;
	}

	$: toast = toastSrc[binValue(effort.joules, bins)];
	// $: ToastIdx = binValue(effort.joules, bins);
	$: {
		toast;
		if (effort.id) {
			setTimeout(() => {
				showShare = true;
				setTimeout(() => {
					showShare = false;
				}, 10000);
			}, 5000);
		}
	}

	let showShare = false;
	let h: number;
	let w: number;
	let sharePosX = 0;
	let sharePosY = 0;

	$: {
		if (h) {
			sharePosX = w / 2;
			sharePosY = h / 2;
		}
	}

	function showShareButtons(e: PointerEvent | KeyboardEvent) {
		// Set the position of the share buttons to be centered around the click
		if (e.offsetX != undefined) {
			sharePosX = e.offsetX;
			sharePosY = e.offsetY;
		} else {
			sharePosX = 0;
			sharePosY = 0;
		}
		showShare = true;
		setTimeout(() => {
			showShare = false;
		}, 5000);
	}

	let url = new URL('https://www.canyoutoast.com').toString();

	$: {
		const newUrl = new URL('https://www.canyoutoast.com');
		const newEffort: effortURLParams = {
			name: effort.name!,
			// id: effort.id!,
			power: effort.power.toFixed(0),
			timeS: effort.timeS.toFixed(0),
			bin: binValue(effort.joules, bins).toFixed(0)
		};
		newUrl.searchParams.append('obj', JSON.stringify(newEffort));

		url = newUrl.toString();
	}
</script>

<svelte:head>
	{#each toastSrc as toastPreload}
		<link rel="preload" as="image" href={toastPreload.src} />
	{/each}
</svelte:head>

<div class="absolute w-full" bind:clientWidth={w} bind:clientHeight={h}>
	<div style="font-size: 50px; bottom: 100%;" class="absolute text-center w-full">
		{toast.text}
	</div>
	<img
		src={toast.src}
		alt={toast.altText}
		on:click={showShareButtons}
		on:keydown={showShareButtons}
		class="w-full h-full"
	/>
	<div
		style={`top: ${sharePosY}px; left: ${sharePosX}px`}
		class="fixed -translate-y-1/2 -translate-x-1/2"
	>
		<Share {showShare} {url} />
	</div>

	{#if effort.id != null}
		<div style="font-size: 20px; bottom: 97%;" class="absolute w-full text-center">
			{effort.power.toFixed(0)}W for {secondsToMMSS(effort.timeS)}
		</div>
		<a
			style="font-size: 20px; transform-origin: bottom left;"
			class="absolute w-fit cursor-pointer left-0 top-full"
			target="_blank"
			rel="noreferrer"
			href={`http://www.strava.com/activities/${effort.id}`}
		>
			<div>View on strava</div>
		</a>
	{/if}
</div>

<style>
</style>
