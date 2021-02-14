<template>
  <div class="w-full flex h-16 m-1 text-black bg-white
  rounded-md shadow-sm"
  v-bind:class="{'opacity-50': checked}"
  v-on:click="checkClicked">
    <div class="flex-none w-10 rounded-l-md"
    v-bind:class="{'bg-gray-300': checked, 'bg-yellow-400': !checked}">
      <div class="ml-2 mt-5 w-6 h-6 rounded-sm bg-gray-400 opacity-40 border-2 border-gray-600 hover:opacity-80"
      v-bind:class="{'border-none': checked, }">

      </div>
    </div>
    <div class="flex-auto pl-2">
      <h2 class="text-xl">{{ title }}</h2>
      <p class="text-gray-600">{{ notes }}</p>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'DailyTask',
  props: ['title', 'notes', 'checked', 'diff', 'streak', 'id'],
  data () {
    return {
      checkButton: null,
    }
  },
  methods: {
    checkClicked: function() {
        this.checked = !this.checked;
        this.emitClicked();
    },
    emitClicked: function() {
			// console.log('emitClicked')
			var bodyData = {
				"completed": true,
			}
			this.$emit('taskclicked', this.id, bodyData);
		}
  }
}
</script>

<style scoped>
</style>