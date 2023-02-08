<script lang="ts">
    import { page } from '$app/stores';
    import {stravaOAuth} from "./api"
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    const params = $page.url.searchParams;

</script>

{#if data.status}
    <div>{JSON.stringify(data)}</div>
{:else}
<div>{JSON.stringify(data)}</div>
<button type="button" on:click={stravaOAuth}>Authenticate with Strava</button>
{/if}

<style>

</style>