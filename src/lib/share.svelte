<script lang="ts">
	import { Email, Reddit, WhatsApp, Facebook, Twitter } from 'svelte-share-buttons-component';

	const url = 'google.com';
	const title = 'Svelte Share Buttons Component';
	const desc = 'Svelte based social media share buttons component with no tracking.';
</script>

<div style="width: 100px; height: 100px;">
	<div class="circle">
		<Email subject={title} body="{desc} {url}" />
	</div>
	<div class="circle">
		<Reddit class="share-button" {title} {url} />
	</div>
	<div class="circle">
		<WhatsApp class="share-button" text="{title} {url}" />
	</div>
	<div class="circle">
		<Facebook class="share-button" quote={title} {url} />
	</div>
	<div class="circle">
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
	.circle {
		position: absolute;
		left: calc(50% - 25px);
		top: calc(50% - 25px);
		transition: translate 1s;
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
