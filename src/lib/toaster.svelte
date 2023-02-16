<script lang="ts">
	// https://www.youtube.com/watch?v=G0HtHr46Awg&ab_channel=CodingArtist

	export let status: 'waiting' | 'loading' | 'finished' | 'display' = 'waiting';
</script>

<div class={`absolute w-132 h-96 -z-10 ${status}-shake`}>
	<div
		style="width: 45%; height: 45%"
		class={`absolute -top-10 left-44 toast-${status} moving text-transparent`}
	>
		<slot />
	</div>
	<div class="absolute w-full h-full">
		<div
			style="width: 95%; height: 75%;"
			class="relative top-0 bg-red-600 big-round shadow-current shadow-lg"
		/>
		<div style="width: 80%; height: 75%;" class="absolute top-0 right-0 bg-red-400 big-round" />
		<div
			style="width: 5%; height: 15%; border-radius:50%;"
			class="absolute top-5 right-6 bg-red-200 -rotate-45"
		/>
		<div style="width: 5%; height: 50%" class="absolute top-14 left-9 bg-gray-700 rounded-lg" />
		<div style="width: 5%; height: 50%" class="absolute top-14 left-12 bg-gray-800 rounded-lg" />
		<div style="width: 20%; height: 5%" class={`absolute top-14 left-8 ${status} moving `}>
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
			<div style="left: 90%;"class="absolute feet bg-gray-700 rounded-xl" />
			<div style="width: 85%; height: 50%; right: -2.5%" class="absolute bg-gray-500 rounded-lg" />
		</div>
	</div>
</div>

<style>
	.feet {
		width: 4%;
		height: 70%;
		top: 30%;
	}

	.big-round {
		border-radius: 80px 80px 0 0;
	}

	.moving {
		transition: all 1.5s;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.waiting {
		transform: translate(0);
	}

	.loading {
		transform: translate(0, 160px);
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
		transform: translate(0, -100) skew(0deg, -15deg);
	}

	.toast-loading {
		transform: translate(0, 80px);
	}

	.toast-finished {
		transform: translate(0, -300px);
		transition: all 0.5s;
	}

	.toast-display {
		transform: translate(-15rem, -120px) rotate(5deg);
		transition: all 1s;
		z-index: 1;
		width: 40rem;
		height: 40rem;
		color: black;
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
