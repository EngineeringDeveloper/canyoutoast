<script lang="ts">
	import { page } from '$app/stores';
	export let title: string;
	export let description: string;
	export let image = '/images/toast/0.png';
	export let path = $page.url.pathname;
	export let domain = 'https://www.canyoutoast.com';
    export let fbAppID = "1629643650789430"
	export let titleSuffix = '... thats it';
	const titleWithSuffix = (titleSuffix === title) ? title : `${title} | ${titleSuffix}`;
	const fullURI = `${domain}${path}`;
</script>

<svelte:head>
	<!-- Search engines -->
	<title>{titleWithSuffix}</title>
	<meta name="title" content={titleWithSuffix} />
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={fullURI} />
	<meta property="og:title" content={titleWithSuffix} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="fb:app_id" content={fbAppID} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={fullURI} />
	<meta property="twitter:title" content={titleWithSuffix} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
	<meta property="twitter:creator" content="@canyoutoast" />
</svelte:head>