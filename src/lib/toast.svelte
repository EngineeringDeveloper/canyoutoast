<script lang="ts">
	import type {binLength} from "$lib/types"

	export let value: number;
	export let bins: binLength;

    interface toast {
		src: string,
		text: string,
		altText: string,
	}
	// Places the value in one of 11 bins and decides which picture of toast to select based off that.
    // First bin is <= value
    // values exceeding the top bin value are handled
	const toastSrc: toast[] = [
		{text:"Thats just Bread", altText:"Thats just Bread", src:'/images/toast/0.png'}, // 0 Bread
		{text:"I guess it's warm?", altText:"Warmed Bread", src:'/images/toast/3.png'},
		{text:"If you look closely", altText:"Slightly cooked if you look closely", src:'/images/toast/3.png'},
		{text:"Just about!", altText:"Just about toast", src:'/images/toast/3.png'}, // 3
		{text:"Keep Trying", altText:"almost toast keep trying", src:'/images/toast/3.png'},
		{text:"Not quite there", altText:"Almost Done Toast", src:'/images/toast/6.png'},
		{text:"Now thats Toast", altText:"Builders Brew Toast", src:'/images/toast/6.png'}, // 6
		{text:"A little over done", altText:"a litte overdone Toast", src:'/images/toast/6.png'},
		{text:"That'll do", altText:"overdone Toast", src:'/images/toast/6.png'},
		{text:"Half way to dust", altText:"half burnt", src:'/images/toast/10.png'},
		{text:"Maybe edible", altText:"almost burnt", src:'/images/toast/10.png'}, // 10
		{text:"On Fire!", altText:"Toast on Fire", src:'/images/toast/10.png'} // Burnt
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

	let toast = toastSrc[binValue(value, bins)]

</script>

<div class="relative">
	<div style = "font-size: 50px" class="relative -top-10 text-center">{toast.text}</div>
	<img class="absolute top-0" src ={toast.src} alt={toast.altText}/>
</div>

<style>
</style>
