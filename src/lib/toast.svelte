<script lang="ts">
	import type {binLength} from "$lib/types"

	export let value: number;
	export let bins: binLength;

    
	// Places the value in one of 11 bins and decides which picture of toast to select based off that.
    // First bin is <= value
    // values exceeding the top bin value are handled
	const toastSrc = [
		'/images/toast/0.png', // 0 Bread
		'/images/toast/3.png',
		'/images/toast/3.png',
		'/images/toast/3.png', // 3
		'/images/toast/3.png',
		'/images/toast/6.png',
		'/images/toast/6.png', // 6
		'/images/toast/6.png',
		'/images/toast/6.png',
		'/images/toast/10.png',
		'/images/toast/10.png', // 10
		'/images/toast/10.png' // Burnt
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
        return 11
	}

</script>

<img src ={toastSrc[binValue(value, bins)]} alt={"Toast"}/>

<style>
</style>
