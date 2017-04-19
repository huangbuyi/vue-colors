<template>
<div 
	ref='root'
	class='vc-locator'
	:class='{disabled: disabled}'
	:style='style'
	@click='handleClick'
>
	<div 
		class='vc-locator-pointer'
		:style='pointerStyle'
	></div>
</div>
</template>

<script>
import calcEventPosition from '../../utils/calcEventPosition'

export default {
	props: {
		locationX: {
			type: Number,
			default: 0
		},
		locationY: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
    style: Object
	},
	data () {
		return {
			x: this.locationX,
			y: this.locationY
		}
	},
	computed: {
		pointerStyle () {
			return {
				left: this.x * 100 + '%',
				top: this.y * 100 + '%'
			}
		}
	},
	methods: {
		handleClick (e) {
			let p = calcEventPosition(e, this.$refs.root)
			this.$emit('change', p)
			this.x = p.leftP 
			this.y = p.topP
		}
	},
	watch: {
		locationX (v) {
			this.x = v
		},
		locationY (v) {
			this.y = v
		}
	}
}

</script>

<style>
.vc-locator {
	position: relative;
	width: 100%;
	height: 255px;
	background: red;
}
.vc-locator-pointer {
	position: absolute;
	width: 10px;
	height: 10px;
	background: yellow;
}
</style>