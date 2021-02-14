<template>
  <div class="w-full h-full ">
	<svg width="100%" height="100%" viewBox="0 0 100 100 "
	preserveAspectRatio="xMidYMid meet">
		<g class="" :transform="translate">

			<path class="" stroke="#000000" :d="temp_line"/>
		</g>
		
	</svg>
  </div>
</template>

<script>
import * as d3 from "d3"

export default {
	name: 'HourlyForecastChart',
	props: ['hourly'],
	data () {
			return {
				temp_line: "",
				//Translate co-ords for chart, x axis and yaxis. This is injected into template
				translate: "translate(" + 50 + "," + 5 + ")",
				trnsY: "translate(0,0)",
				trnsX: this.getTrnsx,
				toggleClass: true,

				height: 500,
				width: 500,
				margin: {
					right: 5,
					left: 5,
					top: 5,
					bottom: 5
				},
				colors: ["#F45656", "#EAEA34"]
			}
	},
	computed: {
		

	},
	watch: {
		
	},
	methods: {
		getScales: function() {
			var parseTime = d3.timeFormat("%-I %p");
			// console.log(this.hourly)
			this.hourly.forEach(function(d) {
				
				d.time = parseTime(d.date);
			});

			const x = d3.scaleUtc()
						.domain([this.hourly[0].time, this.hourly[11].time])
						.range([this.margin.left, this.width - this.margin.right]);
			const y = d3.scaleLinear()
						.domain(d3.extent(this.hourly, function(d) {
							// console.log(d.temp)
							return d.temp;
						}))
						.range([this.margin.top, this.height- this.margin.bottom]);
			
			d3.axisBottom().scale(x);
			d3.axisLeft().scale(y);

			var xAxis = d3
				.axisBottom()
				.scale(x)
				.tickFormat(d3.timeFormat("%-I %p"))
				.ticks(d3.utcHour);

			var yAxis = d3
				.axisLeft()
				.scale(y)
				.ticks(5);
			var yGrid = d3
				.axisLeft()
				.scale(y)
				.tickSize(-(this.width - 10), 0, 0)
				.tickFormat(""); 
			return {
				x,
				y,
				xAxis,
				yAxis,
				yGrid
			}
		},
		getTrnsx: function() {
			const t = "translate(0," + this.height + ")";
			return t;
		},
		calculatePath: function() {
			const scale = this.getScales();

			const path = d3
				.line()
				.x(d => {
				return scale.x(d.time);
				})
				.y(d => {
				return scale.y(d.temp);
				});

			// draw line then this.line is injected into the template
			this.temp_line = path(this.hourly);
		}
	},
	mounted() {
		
	}
}
</script>

<style scoped>

</style>