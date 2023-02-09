<script lang="ts">
    import { page } from '$app/stores';
    import {Strava, stravaOAuth} from "./api"
    import { SyncLoader } from 'svelte-loading-spinners';

    import type { PageData } from './$types';
    
    export let data: PageData;
    
    const params = $page.url.searchParams;
    let api: Strava
    if (data.status) {
        api = new Strava(data.access_token, data.refresh_token)
    }

</script>

{#if data.status}
    <div>{JSON.stringify(data)}</div>
    {#await api.getAthlete()}
        <SyncLoader/>
    {:then data}
        {JSON.stringify(data)}
    {:catch error}
        <div>{error}</div>
    {/await}
    
{:else}
<div>{JSON.stringify(data)}</div>
<button type="button" on:click={stravaOAuth}>Authenticate with Strava</button>
{/if}

<style>

</style>