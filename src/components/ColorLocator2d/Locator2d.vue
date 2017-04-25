<template>
<div 
	ref='root'
	class='vc-locator'
	:class='{disabled: disabled}'
	:style='style'
	@mousedown='handleMouseDown'
	@touchstart='handleMouseDown'
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
			//type: Number,
			default: 0
		},
		locationY: {
			//type: Number,
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
			y: this.locationY,
			active: false
		}
	},
	computed: {
		pointerStyle () {
			return {
				left: this.x * 100 + '%',
				top: this.y * 100 + '%',
				transition: this.active ? null : 'all 375ms cubic-bezier(0.4,0,0.6,1)',
			}
		}
	},
	methods: {
		handleMouseDown(e) {
			this.active = true
			this.handleChange(e)
			window.addEventListener('mousemove', this.handleChange)
			window.addEventListener('tochmove', this.handleChange)
			window.addEventListener('mouseup', this.handleMouseUp)
			window.addEventListener('touchend', this.handleMouseUp)
		},
		handleMouseUp() {
			this.active = false
			window.removeEventListener('mousemove', this.handleChange)
			window.removeEventListener('tochmove', this.handleChange)
			window.removeEventListener('mouseup', this.handleMouseUp)
			window.removeEventListener('touchend', this.handleMouseUp)
		},
		handleChange(e) {
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
	height: 200px;
	background: red;
}
.vc-locator-pointer {
	position: absolute;
	width: 10px;
	height: 10px;
	background: yellow;
}
</style>