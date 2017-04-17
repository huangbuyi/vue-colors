<template>
	<div>
		<NumberInput :value='value' @change='handleChange'/>
		<button @click='handleClick'>+</button>
	</div>
</template>

<script>
import NumberInput from '../src/components/NumberInput'

export default {
	components: {
		NumberInput
	},
	data () {
		return {
			value: 1
		}
	},
	methods: {
		handleClick () {
			this.value += 1
		},
		handleChange (v) {
			console.log(v)
		}
	}
}
</script>