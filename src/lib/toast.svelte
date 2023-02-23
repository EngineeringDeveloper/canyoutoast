<script lang="ts">
	import type { binLength, effortDetails } from '$lib/types';
	import Share from './share.svelte';

	export let effort: effortDetails;
	export let bins: binLength;

	interface toast {
		src: string;
		text: string;
		altText: string;
	}
	// Places the value in one of 11 bins and decides which picture of toast to select based off that.
	// First bin is <= value
	// values exceeding the top bin value are handled
	const toastSrc: toast[] = [
		{ text: 'Thats just Bread', altText: 'Thats just Bread', src: '/images/toast/0.png' }, // 0 Bread
		{ text: "I guess it's warm?", altText: 'Warmed Bread', src: '/images/toast/1.png' },
		{
			text: 'If you look closely',
			altText: 'Slightly cooked if you look closely',
			src: '/images/toast/2.png'
		},
		{ text: 'Just about!', altText: 'Just about toast', src: '/images/toast/3.png' }, // 3
		{ text: 'Keep Trying', altText: 'almost toast keep trying', src: '/images/toast/4png' },
		{ text: 'Not quite there', altText: 'Almost Done Toast', src: '/images/toast/5.png' },
		{ text: 'Now thats Toast', altText: 'Builders Brew Toast', src: '/images/toast/6.png' }, // 6
		{ text: 'A little over done', altText: 'a litte overdone Toast', src: '/images/toast/7.png' },
		{ text: "That'll do", altText: 'overdone Toast', src: '/images/toast/8.png' },
		{ text: 'Half way to dust', altText: 'half burnt', src: '/images/toast/9.png' },
		{ text: 'Maybe edible', altText: 'almost burnt', src: '/images/toast/10.png' }, // 10
		{ text: 'On Fire!', altText: 'Toast on Fire', src: '/images/toast/11.png' } // Burnt
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

	let showShare = false
	let sharePosX = 0
	let sharePosY = 0

	function showShareButtons(e: PointerEvent | KeyboardEvent) {
		console.log(e)
		// Set the position of the share buttons to be centered around the click
		if (e.offsetX != undefined) {
			sharePosX = e.offsetX
			sharePosY = e.offsetY
		} else {
			sharePosX = 0
			sharePosY = 0
		}
		showShare = true
		setTimeout(() => {
			showShare = false
		}, 5000)
	}

</script>

<div class="absolute">
	<div style="font-size: 50px; bottom: 100%;" class="absolute text-center w-full">
		{toast.text}
	</div>
	<img src={toast.src} alt={toast.altText} on:click={showShareButtons} on:keydown={showShareButtons}/>
	<div style = {`top: ${sharePosY}px; left: ${sharePosX}px`} class="fixed -translate-y-1/2 -translate-x-1/2"><Share {showShare}/></div>
	
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
