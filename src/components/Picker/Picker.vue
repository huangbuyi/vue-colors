<template>
	<p>{{ greeting }} Wordl!</p>
</template>

<script>
export default {
	name: 'Picker',

	props: {
		color: {
			type: String,
			default: 'red'
		},
	},

	data() {
		return {
			color: []
		}
	},

	data: function () {
		return {
			greeting: 'Hello23322244444445555666'
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