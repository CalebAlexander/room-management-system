<template>
  <div class="h-1/5 border-2 border-pink-500 space-x-4">
    <h3 class="inline-block w-16">{{ date }}</h3>
    <!-- <div class="h-10 w-10 border-2 inline-block">
        
    </div> -->
    <h3 class="inline-block">{{ weather }}</h3>
    <h3 class="inline-block">{{ Math.round(high) }}&#176;/{{ Math.round(low) }}&#176;</h3>
    <h3 class="inline-block">{{ rain*100 }}%</h3>
    <h3 class="inline-block">{{ wind }}</h3>
  </div>
</template>

<script>
export default {
  name: 'ForecastDay',
  props: ['date', 'weather', 'high', 'rain', 'low', 'wind'],
}
</script>

<style scoped>

</style>