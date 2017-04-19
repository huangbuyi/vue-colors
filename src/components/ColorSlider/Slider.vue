<template>
	<div class='vc-slider'>
		<span class='vc-slider-label left'>{{ 0 }}</span>
		<div 
			class='vc-slider-track'
			:style='trackStyle'
			ref='track'
		>
			<div 
				class='vc-slider-before'
				:style='beforeStyle'
			></div>
			<div 
				class='vc-slider-pointer'
				:style='pointerStyle'
				@mousedown='handleMouseDown'
				@touchstart='handleMouseDown'
			></div>
		</div>
		<span class='vc-slider-label right'> {{ 123 }} </span>
	</div>
</template>

<script>
import calcEventPosition from '../../utils/calcEventPosition'

export default {
	props: {
		value: {
			type: Number,
			default: 60
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		trackStyle: Object
	},
	data() {
		return {
			currValue: this.value
		}
	},
	computed: {
		beforeStyle() {
			return {
				width: 100 * this.currValue / (this.max - this.min) + '%'
			}
		},
		pointerStyle() {
			return {
				left: 100 * this.currValue / (this.max - this.min) + '%'
			}
		}
	},
	methods: {
		handleMouseDown() {
			document.addEventListener('mousemove', this.handleDrag)
			document.addEventListener('touchmove', this.handleDrag)
			document.addEventListener('touchend', this.handleMouseUp)
			document.addEventListener('mouseup', this.handleMouseUp)
		},
		handleDrag(e) {
			e.preventDefault()
			let p = calcEventPosition(e, this.$refs.track)
			const {min, max} = this
			this.currValue = min + p.leftP * (max - min) 
		},
		handleMouseUp() {
			document.removeEventListener('mousemove', this.handleDrag)
			document.removeEventListener('touchmove', this.handleDrag)
			document.removeEventListener('touchend', this.handleMouseUp)
			document.removeEventListener('mouseup', this.handleMouseUp)
		},
	}
}
</script>

<style>
.vc-slider {
	position: relative;
	height: 30px;
	margin-bottom: 6px;
}
.vc-slider-track {
	display: inline-block;
	position: absolute;
	left: 30px;
	right: 30px;
	top: 14px;
	height: 1px;	
	background: #ccc;
}
.vc-slider-before {
	position: absolute;
	background: red;
	width: 50px;
	height: 1px;
}
.vc-slider-pointer {
	position: absolute;
	top: -15px;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	background: #fff;
	box-shadow: rgba(0,0,0,0.35) 0 1px 3px;
	user-select: none;
	cursor: move;
}
.vc-slider-label {
	box-sizing: border-box;
	display: inline-block;
	width: 30px;
	line-height: 30px;
	color: rgba(0,0,0,0.54);
	font-size: 16px;
	padding: 0 3px;
}
.vc-slider-label.left {
	position: absolute;
	left: 0;
	text-align: right;
}
.vc-slider-label.right {
	position: absolute;
	right: 0;
	text-align: left;
}
</style>