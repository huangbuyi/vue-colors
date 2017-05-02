<template>
	<div class='vc-slider'>
		<div class='vc-slider-title'>
			<div class='vc-slider-field'>{{ label }}</div>
			<div class='vc-slider-value'>Value:{{this.currValue.toFixed(0)}}</div>
		</div>
		<div class='vc-slider-label left'>{{ min }}</div>
		<div 
			class='vc-slider-track'
			:style='trackStyle'
			ref='track'
		>
			<div 
				class='vc-slider-before'
				:style='beforeStyle2'
			></div>
			<div 
				class='vc-slider-pointer'
				:style='pointerStyle'
				@mousedown='handleMouseDown'
				@touchstart='handleMouseDown'
			></div>
		</div>
		<div class='vc-slider-label right'> {{ max }} </div>
	</div>
</template>

<script>
import calcEventPosition from '../../utils/calcEventPosition'
import throttle from 'lodash/throttle'

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
		label: String,
		trackStyle: Object,
		beforeStyle: Object,
	},
	data() {
		return {
			currValue: this.format(this.value),
			active: false
		}
	},
	computed: {
		beforeStyle2() {
			return Object.assign({
				width: 100 * this.currValue / (this.max - this.min) + '%',
				transition: this.active ? null : 'all 375ms cubic-bezier(0.4,0,0.2,1)'
			}, this.beforeStyle)
		},
		pointerStyle() {
			return {
				left: 100 * this.currValue / (this.max - this.min) + '%',
				transition: this.active ? null : 'all 375ms cubic-bezier(0.4,0,0.2,1)'
			}
		}
	},
	methods: {
		handleMouseDown() {
			this.active = true
			document.addEventListener('mousemove', this.handleDrag)
			document.addEventListener('touchmove', this.handleDrag)
			document.addEventListener('touchend', this.handleMouseUp)
			document.addEventListener('mouseup', this.handleMouseUp)
		},
		handleDrag(e) {
			e.preventDefault()
			let p = calcEventPosition(e, this.$refs.track)
			const {min, max} = this
			let newValue = min + p.leftP * (max - min) 
			if(newValue === this.currValue) {
				return 
			}
			this.currValue = newValue
			this.$emit('change', this.currValue)
		},
		handleMouseUp() {
			this.active = false
			document.removeEventListener('mousemove', this.handleDrag)
			document.removeEventListener('touchmove', this.handleDrag)
			document.removeEventListener('touchend', this.handleMouseUp)
			document.removeEventListener('mouseup', this.handleMouseUp)
		},
		format(v) {
			v = v > this.max ? this.max : v 
			v = v < this.min ? this.min : v
			return v 
		}
	},
	watch: {
		value(v) {
			if(!this.active) {
				this.currValue = this.format(v)
			}
		}
	},
	beforeMount() {
		this.handleDrag = throttle(this.handleDrag, 20)
	}
}
</script>

<style scoped>
.vc-slider {
	position: relative;
	height: 30px;
	margin-bottom: 6px;
	user-select: none;
}
.vc-slider-title {
	display: inline-block;
}
.vc-slider-field {
	line-height: 1;
	font-size: 16px;
	color: rgba(0,0,0,0.87);
}
.vc-slider-value {
	line-height: 1;
	font-size: 12px;
	color: rgba(0,0,0,0.54);
}
.vc-slider-track {
	position: absolute;
	left: 80px;
	right: 30px;
	top: 14px;
	height: 1px;	
	background: #ccc;
	transition: all 375ms cubic-bezier(0.4,0,0.6,1);
}
.vc-slider-before {
	position: absolute;
	background: red;
	width: 50px;
	height: 1px;
}
.vc-slider-pointer {
	position: absolute;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	background: #fff;
	box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 3px, rgba(0, 0, 0, 0.217647) 0px 1px 2px;
	user-select: none;
	cursor: move;
	transform: translate(-15px,-15px);
	z-index: 1;
}
.vc-slider-label {
	box-sizing: border-box;
	display: inline-block;
	width: 30px;
	line-height: 30px;
	color: rgba(0,0,0,0.54);
	font-size: 12px;
	padding: 0 3px;
}
.vc-slider-label.left {
	position: absolute;
	left: 50px;
	text-align: right;
}
.vc-slider-label.right {
	position: absolute;
	right: 0;
	text-align: left;
}
</style>