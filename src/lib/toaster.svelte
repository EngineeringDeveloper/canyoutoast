<script lang="ts">
    // https://www.youtube.com/watch?v=G0HtHr46Awg&ab_channel=CodingArtist

    export let status: "waiting" | "loading" |  "finished" | "display"= "waiting"
    function demo() {
        status = "waiting"
        setTimeout(() => {
            status = "loading"
            setTimeout(() => {
                status = "finished"
                setTimeout(() => {  
                    status = "display"
                }, 1000)
            }, 3000)
        }, 1000)
    }

    function finish_and_show() {
        status = "finished"
        setTimeout(() => {  
            status = "display"
        }, 1000)
    }
</script>
<div class="absolute top-14">
    <button on:click={ ()=> status = "waiting"}>waiting</button>
    <button on:click={ ()=> status = "loading"}>loading</button>
    <button on:click={ ()=> status = "finished"}>finished</button>
    <button on:click={ ()=> status = "display"}>display</button>
    <button on:click={finish_and_show}>Pop</button>
    <button on:click={demo}>All</button>
</div>
<div class={`m-auto w-fit h-fit absolute inset-0 -z-10 ${status}-shake`}>
    <div class= {`absolute -top-10 left-44 w-56 h-56 toast-${status} moving text-transparent`}>
        <slot />
    </div>
    <div>
        <div class="relative top-0 left- bg-blue-600 w-128 h-72 big-round"></div>
        <div class="absolute top-0 right-0 bg-blue-400 w-96 h-72 big-round"></div>
        <div class="absolute top-14 left-9 bg-gray-700 w-6 h-48 rounded-lg"></div>
        <div class="absolute top-14 left-12 bg-gray-800 w-6 h-48 rounded-lg"></div>
        <div class= {`absolute top-14 left-8 ${status} moving `}>
            <div class="absolute bg-gray-300 w-14 h-6 rounded-md"></div>
            <div class="relative bg-gray-100 w-12 h-6 rounded-md"></div>
        </div>
        <div class="absolute top-15 -left-4 bg-gray-700 w-132 h-6 rounded-lg"></div>
    </div>
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
        transform: translate(0, -100);
    }
    
    .toast-loading {
        transform: translate(0, 80px) ;
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
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

</style>