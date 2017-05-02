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
	>
		<div class='vc-locator-color' :style='colorStyle'></div>
	</div>
</div>
</template>

<script>
import calcEventPosition from '../../utils/calcEventPosition'
import throttle from 'lodash/throttle'

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
    style: Object,
    colorStyle: Object
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
				transition: this.active ? null : 'all 375ms cubic-bezier(0.4,0,0.2,1)',
				transform: 'translate(-30px, 10px) ' + (this.y > 0.78 ? 'rotate(180deg)' : '')
			}
		}
	},
	methods: {
		handleMouseDown(e) {
			this.active = true
			this.handleChange(e)
			window.addEventListener('mousemove', this.handleChange)
			window.addEventListener('touchmove', this.handleChange)
			window.addEventListener('mouseup', this.handleMouseUp)
			window.addEventListener('touchend', this.handleMouseUp)
		},
		handleMouseUp() {
			this.active = false
			window.removeEventListener('mousemove', this.handleChange)
			window.removeEventListener('touchmove', this.handleChange)
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
	},
	beforeMount() {
		this.handleChange = throttle(this.handleChange, 20)
	}
}

</script>

<style scoped>
.vc-locator {
	position: relative;
	width: 100%;
	height: 200px;
	background: red;
}
.vc-locator-pointer {
	box-sizing: border-box;
	position: absolute;
	width: 10px;
	height: 10px;
	background: #fff;
	box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 3px, rgba(0, 0, 0, 0.117647) 0px 1px 2px;
	width: 60px;
	height: 40px;
	padding: 4px;
	transform-origin: 30px -10px;
}
.vc-locator-pointer::before {
	box-sizing: border-box;
	position: absolute;
	left: 20px;
	top: -20px;
	content: '';
	border-width: 10px;
	border-color: transparent transparent #fff  transparent;
	border-style: solid;
}
.vc-locator-color {
	box-sizing: border-box;
	height: 100%;
	border: 1px solid rgba(200,200,200,0.2);
}
</style>