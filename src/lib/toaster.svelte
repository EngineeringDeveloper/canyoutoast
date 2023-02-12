<script lang="ts">
    // https://www.youtube.com/watch?v=G0HtHr46Awg&ab_channel=CodingArtist

    export let status: "waiting" | "loading" |  "finished" = "waiting"

</script>
<div>
    <button on:click={ ()=> status = "waiting"}>waiting</button>
    <button on:click={ ()=> status = "loading"}>loading</button>
    <button on:click={ ()=> status = "finished"}>finished</button>
</div>
<div class="m-auto w-fit h-fit absolute inset-0">
    <!-- <slot style ="width: 24rem; height 24rem;"/> -->
    <div class="relative top-0 left- bg-blue-600 w-128 h-72 big-round"></div>
    <div class="absolute top-0 right-0 bg-blue-400 w-96 h-72 big-round"></div>
    <div class="absolute top-14 left-9 bg-gray-700 w-6 h-48 rounded-lg"></div>
    <div class="absolute top-14 left-12 bg-gray-800 w-6 h-48 rounded-lg"></div>
    <div class= {`absolute top-14 left-8 ${status} moving`}>
        <div class="absolute bg-gray-300 w-14 h-6 rounded-md"></div>
        <div class="relative bg-gray-100 w-12 h-6 rounded-md"></div>
    </div>
    <div class="absolute top-15 -left-4 bg-gray-700 w-132 h-6 rounded-lg"></div>
</div>

<style>
    .big-round { 
        border-radius: 80px 80px 0 0;
    }

    .moving {
        transition: all 1.5s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
    }

    .waiting {
        transform: translate(0);
    }
    
    .loading {
        transform: translate(0, 160px) ;
    }

    .finished {
        transform: translate(0);
        transition: all 0.5s;
    }

</style>