<template>
	<div class='demo'>
		<picker>
		</picker>
	</div>
</template>

<script>
import picker from '../src/components/Picker'
import picker2 from '../dist/vueColorPicker.min'

export default {
	components: {
		picker: picker2
	}
}
</script>

<style>
.demo {
	margin: 24px;
}
</style>
