<script lang="ts">
	// https://www.youtube.com/watch?v=G0HtHr46Awg&ab_channel=CodingArtist
	import Smoke from '$lib/smoke.svelte';

	export let status: 'waiting' | 'loading' | 'finished' | 'display' = 'waiting';

	$: showSmoke = status == 'loading';
</script>


{#if status != "waiting"}
<Smoke {showSmoke} />
{/if}
<div
	style="aspect-ratio: 1.41; margin-top: 20%"
	class={`absolute w-80 sm:w-96 md:w-128 lg:w-132 xl:132 2xl:w-142 -z-10 ${status}-shake z-10`}
>
	<div class={`absolute toast toast-${status} moving`}>
		<slot />
	</div>
	<div class="absolute w-full h-full z-10">
		<div
			style="width: 95%; height: 75%;"
			class="relative top-0 bg-red-600 big-round shadow-current shadow-lg"
		/>
		<div style="width: 80%; height: 75%;" class="absolute top-0 right-0 bg-red-400 big-round" />
		<div
			style="width: 5%; height: 15%; border-radius: 50%; top: 2%; right: 4%"
			class="absolute bg-red-200 -rotate-45"
		/>
		<div
			style="width: 5%; height: 50%; top: 15%; left: 6%;;"
			class="absolute bg-gray-700 rounded-lg"
		/>
		<div
			style="width: 5%; height: 50%;  top: 15%; left: 8%;;"
			class="absolute bg-gray-800 rounded-lg"
		/>
		<div style="width: 20%; height: 5%; top: 15%; left: 5%;;" class={`absolute ${status} moving `}>
			<div style="width: 50%; height: 100%" class="absolute bg-gray-300 rounded-md" />
			<div style="width: 40%; height: 100%" class="relative bg-gray-100 rounded-md" />
		</div>
		<div style="width:100%; height: 10%" class="absolute top-15">
			<div
				style="width:105%; height: 50%; left: -2.5%"
				class="absolute  bg-gray-700 top-0 rounded-xl"
			/>
			<div style="left: 5%;" class="absolute feet bg-gray-700 rounded-xl" />
			<div style="left: 20%;" class="absolute feet bg-gray-700 rounded-xl" />
			<div style="left: 75%;" class="absolute feet bg-gray-700 rounded-xl" />
			<div style="left: 90%;" class="absolute feet bg-gray-700 rounded-xl" />
			<div style="width: 85%; height: 50%; right: -2.5%" class="absolute bg-gray-500 rounded-lg" />
		</div>
	</div>
</div>

<style>
	.toast {
		left: 35%;
		bottom: 70%;
		width: 45%;
		height: 45%;
	}

	.feet {
		width: 4%;
		height: 70%;
		top: 30%;
	}

	.big-round {
		border-top-left-radius: 10% 15%;
		border-top-right-radius: 10% 15%;
	}

	.moving {
		transition: all 1.5s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.waiting {
		transform: translate(0);
	}

	.loading {
		transform: translate(0, 850%);
	}

	.loading-shake {
		animation: shake 0.5s;
		animation-iteration-count: infinite;
	}

	.finished {
		transform: translate(0);
		transition: all 0.5s;
	}
	.display {
		transform: translate(0);
	}

	.toast-waiting {
		width: 45%;
		height: 45%;
		color: transparent;
	}

	.toast-loading {
		transform: translate(0, 50%);
		width: 45%;
		height: 45%;
		color: transparent;
	}

	.toast-finished {
		transform: translate(0, -180%);
		transition: all 0.5s;
		width: 45%;
		height: 45%;
		color: transparent;
	}

	.toast-display {
		transition: transform 1s, width 1s, height 1s, color 3s 1s;
		transform: translate(-35%, 50%) rotate(5deg);
		z-index: 50;
		width: 90vw;
		height: 90vw;
		color: black;
	}

	:global(.toast-display > div > a) {
		transition: color 3s 1s;
		color: #fc4c02;
	}

	@media (min-width: 1024px) {
		.toast-display {
			width: 70vh;
			height: 70vh;
			transform: translate(-35%, 35%) rotate(5deg);
		}
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
