<template>
	<input 
		type='number' 
		:value='currValue' 
		:min='min'
		:max='max'
		:step='step'
		@change='handleChange'
	/>
</template>

<script>
export default {
	name: 'NumberInput',

	props: {
		value: {
			type: Number,
			default: 0
		},
		min: Number,
		max: Number,
		step: {
			type: Number,
			default: 1
		}
	},

	data() {
		return {
			currValue: null,
			blurValue: null
		}
	},

	methods: {
		handleChange(e) {
			console.log(e.target.value)
		}
	}
}
</script>

<style>
p {
	font-size: 2em;
	text-align: center;
}
</style>