<script>
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	
	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />

<style lang="postcss">
	:global(body){
            @apply bg-gray-300 dark:bg-gray-600
			text-gray-900
			dark:text-gray-300;
        }
</style>