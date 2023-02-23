<script lang="ts">
	import { Email, Reddit, WhatsApp, Facebook, Twitter } from 'svelte-share-buttons-component';
	export let showShare = false

	$: position = showShare ? "circle" : "middle"
	const url = 'google.com';
	const title = 'Svelte Share Buttons Component';
	const desc = 'Svelte based social media share buttons component with no tracking.';
</script>


<div style="width: 100px; height: 100px;">
	<div class={`${position}`}>
		<Email class="share-button" subject={title} body="{desc} {url}" />
	</div>
	<div class={`${position}`}>
		<Reddit class="share-button" {title} {url} />
	</div>
	<div class={`${position}`}>
		<WhatsApp class="share-button" text="{title} {url}" />
	</div>
	<div class={`${position}`}>
		<Facebook class="share-button" quote={title} {url} />
	</div>
	<div class={`${position}`}>
		<Twitter
			class="share-button"
			text={title}
			{url}
			hashtags="github,svelte"
			via="username"
			related="other,users"
		/>
	</div>
</div>

<style>
	:global(.share-button) {
		height: 40px;
		width: 40px;
		border-radius: 20%;
		display: inline-block;
	}
	.middle {
		position: absolute;
		left: calc(50% - 20px);
		top: calc(50% - 20px);
		transition: all 1s;
		transform: translate(0, 0);
		visibility: hidden;
		opacity: 0;
	}
	.circle {
		position: absolute;
		left: calc(50% - 20px);
		top: calc(50% - 20px);
		transition: all 0.5s;
	}

	.circle:nth-child(1) {
		transform: translate(0px, -100px);
	}

	.circle:nth-child(2) {
		transform: translate(-95px, -30px);
	}

	.circle:nth-child(3) {
		transform: translate(-58px, 80px);
	}

	.circle:nth-child(4) {
		transform: translate(85px, 80px);
	}

	.circle:nth-child(5) {
		transform: translate(95px, -30px);
	}
</style>
