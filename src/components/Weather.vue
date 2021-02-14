<template>
	<div id="weather" class="h-full text-white">
		<div class="flex w-full h-1/3">
			<div class="h-full w-1/2 border-2 border-pink-500">
			<!-- Date -->
				<h2>{{ weather.current.date}}</h2>
				<div class="flex">
					<div>
						<!-- Temperature -->
						<h3 class="text-7xl">{{weather.current.temp}}&#176;</h3>        
					</div>
					<div>
						<!-- Weather symbol -->
					</div>
				</div>
			</div>
			<div class="h-full w-1/2 border-2 border-pink-500">
				<div class="h-1/3">
					<!-- Sunrise/ Sunset Time -->
				</div>
				<div class="flex">
					<div class="w-1/2">
						<ul>
							<li>High/Low: </li>
							<li>Wind: </li>
							<li>Pressure: </li>
							<li>Visibility: </li>
						</ul>
					</div>
					<div class="w-1/2">
						<ul>
							<li>Rain: </li>
							<li>Dew Point: </li>
							<li>UV Index: </li>
							<li>Moon Phase: </li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="h-1/6 w-full border-2 border-pink-500">
			<HourlyForecastChart ref="hourlyforecast" :hourly="this.weather.hourly"></HourlyForecastChart>
		</div>
		<div class="h-1/2 w-full">
			<ForecastDay 
			v-for="day in weather.forecast" 
			:key="day.date"

			:date="day.date"
			:weather="day.weather"
			:high="day.high"
			:rain="day.rain"
			:low="day.low"
			:wind="day.wind"
			></ForecastDay>
		</div>
	</div>
</template>

<script>
import ForecastDay from './WeatherComponents/ForecastDay.vue'
import HourlyForecastChart from './WeatherComponents/HourlyForecastChart.vue'

export default {
	name: 'Weather',
	components: {
		ForecastDay,
		HourlyForecastChart,
	},
	props: {

	},
	data () {
		return {
			// 35.79924613054951, -78.61838525792795
			lat: '35.779591',
			long: '-78.638176',
			apikey: 'b8ffc8c37bf54a7f9a4d7deec7e2bb1d',
			weather: {
				current: {
					date: '',
					temp: '',
					weather: '',
					sunrise: '',
					sunset: '',
					highLow: '',
					rain: '',
					wind: '',
				},
				forecast: [
					{
						date: 'Mon 25',
						high: '53&#176;',
						weather: 'sunny',
						low: '--/36',
						rain: '12%',
						wind: '2 mph NW',
					},
					{
						date: 'Tue 26',
						high: '53&#176;',
						weather: 'sunny',
						low: '--/36',
						rain: '12%',
						wind: '2 mph NW',
					},
					{
						date: 'Wed 27',
						high: '53&#176;',
						weather: 'sunny',
						low: '--/36',
						rain: '12%',
						wind: '2 mph NW',
					},
					{
						date: 'Thu 28',
						high: '53&#176;',
						weather: 'sunny',
						low: '--/36',
						rain: '12%',
						wind: '2 mph NW',
					},
					{
						date: 'Fri 29',
						high: '53&#176;',
						weather: 'sunny',
						low: '--/36',
						rain: '12%',
						wind: '2 mph NW',
					},
				],
				hourly: []
			},
			displayWeather: false,
			numForecast: 5,
			numHours: 12,
			days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
			months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		}
	},
	methods: {
		updateWeather: function()
		{
				return this.$root.$http.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + this.lat + '&lon=' + this.long + '&exclude=minutely&units=imperial&appid=' + this.apikey)
				.then((response) => 
				{
					this.weather.hourly = [];

					var currentDT = new Date(response.body.current.dt * 1000);
					var day = this.days[currentDT.getDay()];
					var month = this.months[currentDT.getMonth()];
					var date = currentDT.getDate();
					this.weather.current.date = day + ' ' + month + " " + date;

					var sunriseT = new Date(response.body.current.sunrise * 1000);
					var sunsetT = new Date(response.body.current.sunset * 1000);
					this.weather.current.sunrise = sunriseT.getHours() + ':' + sunriseT.getMinutes() + ' am';
					this.weather.current.sunset = sunsetT.getHours() + ':' + sunsetT.getMinutes() + ' pm';

					this.weather.current.temp = Math.round(response.body.current.temp);
					this.weather.current.weather = response.body.current.weather[0].main;
					this.weather.current.rain = '';
					this.weather.current.highLow = '';
					this.weather.current.wind = response.body.current.wind_speed.toString() + " mph " + this.degreesToCompass(response.body.current.wind_deg);

					var i;
					var forecastDT;
					for (i = 1; i < this.numForecast+1; i++) {
						forecastDT = new Date(response.body.daily[i].dt * 1000);
						this.weather.forecast[i-1].date = this.days[forecastDT.getDay()].substr(0,3) + ' ' + forecastDT.getDate();

						this.weather.forecast[i-1].high = response.body.daily[i].temp.max;
						this.weather.forecast[i-1].low = response.body.daily[i].temp.min;
						this.weather.forecast[i-1].rain = response.body.daily[i].pop;
						this.weather.forecast[i-1].weather = response.body.daily[i].weather[0].main;
						this.weather.forecast[i-1].wind = response.body.daily[i].wind_speed.toFixed(1) + " mph " + this.degreesToCompass(response.body.daily[i].wind_deg);
					}

					var j;
					// var hourDT;
					// var h;
					// var ampm;
					for (j =0; j < this.numHours; j++) {
						// hourDT = new Date(response.body.hourly[j].dt * 1000);
						// h = hourDT.getHours() % 12;
						// h = h ? h : 12
						// ampm = hourDT.getHours() >= 12 ? ' pm' : ' am';
						// this.weather.hourly[j].time = h + ampm;
						var hour = {
							date: new Date(response.body.hourly[j].dt * 1000),
							temp: response.body.hourly[j].temp,
							pop:  response.body.hourly[j].pop,
							time: ""
						}
						this.weather.hourly.push(hour);
					}
					this.$refs.hourlyforecast.calculatePath();
					// console.log(this.weather)
				}, () => {
						this.weather = [];
						this.displayWeather = false
				});
		},
		degreesToCompass: function(deg)
		{
				var val = Math.floor((deg / 22.5) + 0.5);
				var dir = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

				return dir[(val % 16)];
		}
	},
	mounted () {
		this.updateWeather();
	}
}
</script>

<style scoped>

</style>
