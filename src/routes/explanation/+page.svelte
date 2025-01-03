<script>
	import { onMount } from "svelte";

    // import Plotly from 'plotly.js-dist-min'
    


    let graphDiv;

    const toastSrc = [
		{ text: 'Thats just Bread', altText: 'Thats just Bread', src: '/images/toast/0.png', idx: 0 }, // 0 Bread
		{ text: "I guess it's warm?", altText: 'Warmed Bread', src: '/images/toast/1.png', idx: 1 },
		{
			text: 'If you look closely',
			altText: 'Slightly cooked if you look closely',
			src: '/images/toast/2.png',
			idx: 2
		},
		{ text: 'Just about!', altText: 'Just about toast', src: '/images/toast/3.png', idx: 3 }, // 3
		{
			text: 'Keep Trying',
			altText: 'almost toast keep trying',
			src: '/images/toast/4.png',
			idx: 4
		},
		{ text: 'Not quite there', altText: 'Almost Done Toast', src: '/images/toast/5.png', idx: 5 },
		{ text: 'Now thats Toast', altText: 'Builders Brew Toast', src: '/images/toast/6.png', idx: 6 }, // 6
		{
			text: 'A little over done',
			altText: 'a litte overdone Toast',
			src: '/images/toast/7.png',
			idx: 7
		},
		{ text: "That'll do", altText: 'overdone Toast', src: '/images/toast/8.png', idx: 8 },
		{ text: 'Half way to dust', altText: 'half burnt', src: '/images/toast/9.png', idx: 9 },
		{ text: 'Maybe edible', altText: 'almost burnt', src: '/images/toast/10.png', idx: 10 }, // 10
		{ text: 'On Fire!', altText: 'Toast on Fire', src: '/images/toast/11.png', idx: 11 } // Burnt
	];

    const bins= [
		30000, 43200, 64800, 86400, 97200, 108000, 129600, 151200, 162000, 172800, 194400
	];

    function binValue(value, bins) {
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
		return 11;
	}

    function secondsToMMSS(number) {
		const mins = number / 60;
		const seconds = number % 60;

		let str = '';
		if (mins > 0) {
			str += Math.floor(mins).toFixed(0);
			str += 'Min';
			if (mins >= 2) {
				str += 's';
			}
			str += ' ';
		}
		str += seconds.toFixed(0);
		str += 's';
		return str;
    }

    onMount(() => {
        // create a plotly graph which shows the power and time required to reach each binned level
        // x axis power from 300 - 1000
        // y axis time from 30 - 600s
        // each bin should fill the graph below it to a diffent color
        // only color the area to the next line

        const data = [];

        for (const [i, bin] of bins.entries()) {
            const x = [];
            const y = [];
            const text = []
            for (let time = 30; time <= 1200; time += 10) {
                x.push(time);
                y.push(bin / time);
                text.push(secondsToMMSS(time));
            }
            data.push({
                x,
                y,
                text,
                type: 'scatter',
                mode: 'lines',
                name: toastSrc[i].text,
                stackgroup: 'one'
            });
        }

        // transform data to make it stackable by normalizing the y values to the previous bin
        for (let i = data.length-1; i > 1; i--) {
            data[i].y = data[i].y.map((val, idx) => val - data[i - 1].y[idx]);
        }

        const layout = {
            title: 'Toast Time vs Power',
            yaxis: {
                title: 'Power (W)',
                range: [0, 1000]
            },
            xaxis: {
                title: 'Time (s)'
            },
            // position the legend below the x axis
            legend: {
                x: 0,
                y: -0.5,
                orientation: 'h'
            },
            // autosize: true,
            // automargin: true,
            // height: 800,
            // width: 800,
            // colorway from green to red to black in 12 steps
            colorway: [
                '#00FF00', '#33FF00', '#66FF00', '#99FF00', '#CCFF00', '#FFFF00',
                '#FFCC00', '#FF9900', '#FF6600', '#FF3300', '#FF0000', '#000000'
            ]
        }

        Plotly.newPlot(graphDiv, data, layout, {responsive: true});

        // not sure why but need to Manually fix the svg position
        for (let svg of document.getElementsByClassName("main-svg")) {
            svg.style.position = "absolute";
            svg.style.top = "0";
        }

        graphDiv.on("plotly_legendclick", () => false)
    });
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-2.35.3.min.js" charset="utf-8"/>
</svelte:head>


<div class= " grid content-center justify-center overflow-hidden" style=" width: 100vw; height:100vh">
    <div bind:this={graphDiv} style="width: 90vw "></div>
     <!-- <div style="background-color: red; width:100px; height: 100px"></div> -->
</div>



