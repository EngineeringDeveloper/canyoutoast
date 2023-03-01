<script lang="ts">
	import { onMount } from 'svelte';
	import { loadFull } from 'tsparticles';
    
    export let showSmoke: boolean = false;

	let ParticlesComponent;

	onMount(async () => {
		const module = await import('svelte-particles');

		ParticlesComponent = module.default;
	});

	let particlesConfig = {
		fpsLimit: 60,
		particles: {
			number: {
				value: 0,
				density: {
					enable: true,
					value_area: 800
				}
			},
			color: {
				value: '#000000',
				animation: {
					enable: true,
					speed: 100,
					sync: true
				}
			},
			shape: {
				type: 'circle'
			},
			opacity: {
				value: 1,
				random: false,
				animation: {
					enable: true,
					speed: 0.5,
					minimumValue: 0,
					sync: false
				}
			},
			size: {
				value: 15,
				random: { enable: true, minimumValue: 4 },
				animation: {
					enable: false,
					speed: 5,
					minimumValue: 4,
					sync: false
				}
			},
			life: {
				duration: {
					value: 2
				},
				count: 1
			},
			move: {
				angle: {
					value: 45,
					offset: 0
				},
				enable: true,
				gravity: {
					enable: true,
					acceleration: -0.5
				},
				speed: 10,
				direction: 'top',
				random: false,
				straight: false,
				size: true,
				outModes: {
					default: 'destroy',
					bottom: 'none'
				},
				attract: {
					enable: false,
					distance: 300,
					rotate: {
						x: 600,
						y: 1200
					}
				}
			}
		},
		emitters: {
			direction: 'top',
			rate: {
				quantity: 1,
				delay: 0.01
			},
			size: {
				width: 40,
				height: 5
			},
			position: {
				x: 50,
				y: 45
			}
		}
	};
    let particlesContainer;
	let onParticlesLoaded = (event) => {
		particlesContainer = event.detail.particles;
		console.log(particlesContainer)
		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	let particlesInit = async (main) => {
		await loadFull(main);
	};

    $: {
        console.log(showSmoke)
        if (particlesContainer) {
            if(showSmoke) {
                setTimeout(() => {
                    if(showSmoke) {
                        particlesContainer.playEmitter()
                    }
                }, 10000)
            } else {
                particlesContainer.pauseEmitter()
            }
        }
    }
    $: op = showSmoke? "0" : "100%"

</script>

<!-- {#if showSmoke} -->
<div style={`left: 50vw; top: 20vh; opacity ${op}; transition: opacity 1s`} class="absolute">
    <svelte:component
        this={ParticlesComponent}
        id="tsparticles"
        options={particlesConfig}
        on:particlesLoaded={onParticlesLoaded}
        {particlesInit}
    />
</div>
<!-- {/if} -->


<style>

</style>