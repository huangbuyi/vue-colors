<template>
	<div>
		<NumberInput :value='value' @change='handleChange'/>
		<button @click='handleClick'>+</button>
		<ColorLocator2d />
		<ColorSlider />
		<ColorSlider />
	</div>
</template>

<script>
import NumberInput from '../src/components/NumberInput'
import ColorLocator2d from '../src/components/ColorLocator2d'
import ColorSlider from '../src/components/ColorSlider'

export default {
	components: {
		NumberInput,
		ColorLocator2d,
		ColorSlider
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