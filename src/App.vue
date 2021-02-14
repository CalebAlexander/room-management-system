<template>
  <div id="app" class="bg-gray-900 h-screen w-screen text-white">
    <button @click.prevent="updateAll">Update All</button>
    <div id="container" class="w-full h-full border-2 border-white flex overflow-x-auto">
      <div id="DashboardTab" class="flex-none w-full h-full border-2 border-red-600 grid grid-cols-6 grid-rows-6">
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 border-2 border-purple-500 overflow-y-scroll">
            <Lighting ref="lighting"></Lighting>
        </div>
        <div class="col-start-4 col-span-3 row-start-1 row-span-1 border-2 border-purple-500">
            <Sound ref="sound"></Sound>
        </div>
        <div class="col-start-1 col-span-6 row-start-2 row-span-3 border-2 border-purple-500 overflow-y-scroll">
            <Habitica ref="habitica"></Habitica>
        </div>
        <!-- <div class="col-start-1 col-span-2 row-start-2 row-span-1 border-2 border-purple-500">
            <Habits/>
        </div>
        <div class="col-start-3 col-span-2 row-start-2 row-span-1 border-2 border-purple-500">
            <Dailies/>
        </div>
        <div class="col-start-5 col-span-6 row-start-2 row-span-1 border-2 border-purple-500">
            <ToDo/>
        </div> -->
        <div class="col-start-1 col-span-3 row-start-5 row-span-2 border-2 border-purple-500">
            <Weather ref="weather"></Weather>
        </div>
        <div class="col-start-4 col-span-3 row-start-5 row-span-2 border-2 border-purple-500">
            <Calendar ref="calendar"></Calendar>
        </div>
      </div>
      <div id="HabiticaTab" class="flex-none h-full w-full border-2 border-blue-600">
        
      </div>
    </div>
    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Lighting from './components/Lighting.vue'
import Sound from './components/Sound.vue'
import Weather from './components/Weather.vue'
import Calendar from './components/Calendar.vue'
// import Habits from './components/Habits.vue'
// import Dailies from './components/Dailies.vue'
// import ToDo from './components/ToDo.vue'
import Habitica from './components/Habitica.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    Lighting,
    Sound,
    Weather,
    Calendar,
    // Habits,
    // Dailies,
    // ToDo,
    Habitica,
    // HelloWorld
  },
  methods: {
    updateAll: function() {
      console.log('update all')
      this.$refs.lighting.updateLighting();
      this.$refs.sound.updateSound();
      this.$refs.habitica.updateHabitica();
      this.$refs.weather.updateWeather();
      this.$refs.calendar.updateCalendar();
    }
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
