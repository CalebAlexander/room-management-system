<template>
	<div class="w-full flex h-16 m-1 text-black bg-white
	rounded-md shadow-sm">
		<div v-on:click="posClicked"  class="flex-none bg-gray-300 w-10 rounded-l-md"
		v-bind:class="{'bg-yellow-400': pos, }">
			<div class="ml-2 mt-5 w-6 h-6 rounded-full bg-gray-400 opacity-40 border-2 border-gray-600 hover:opacity-80"
			v-bind:class="{'border-none': pos, }">

			</div>
		</div>
		<div class="flex-auto pl-2">
			<h2 class="text-xl">{{ title }}</h2>
			<p class="text-gray-600">{{ notes }}</p>
		</div>

		<div v-on:click="negClicked" class="flex-none bg-gray-300 w-10 rounded-r-md"
		v-bind:class="{'bg-yellow-400': neg }">
			<div class="ml-2 mt-5 w-6 h-6 rounded-full bg-gray-400 opacity-70 border-2 border-gray-600 hover:opacity-80"
			v-bind:class="{'border-none': neg, 'bg-none': pos, 'opacity-100': pos}">

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HabitTask',
	props: ['title', 'notes', 'pos', 'posVal', 'neg', 'negVal', 'diff', 'id'],
	data () {
		return {
			posButton: null,
			negButton: null,
		}
	},
	methods: {
		posClicked: function() {
			if (this.pos) {
				this.posVal++;
			}
			this.emitClicked();
			console.log('posClicked')
		},
		negClicked: function() {
			if (this.neg) {
				this.negVal++;
			} 
			this.emitClicked();
			console.log('negClicked')
		},
		emitClicked: function() {
			console.log('emitClicked')
			var bodyData = {
				"counterUp": this.posVal,
				"counterDown": this.negVal,
				"notes": "this task note has been changed!"
			}
			this.$emit('taskclicked', this.id, bodyData);
		}
	}
}
</script>

<style scoped>
</style>