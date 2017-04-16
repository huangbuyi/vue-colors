<template>
	<div>
		<div
			@click='handleDown'
			@focus='handleFocus'
			tabIndex='0'
		>-</div>
		<input 
			type='number' 
			:value='currValue' 
			:min='min'
			:max='max'
			:step='step'
			@change='handleChange'
			@blur='handleBlur'
			:placeHolder='placeHolder'
		/>
		<div
			@click='handleUp'
		>+</div>
	</div>
</template>

<script>
export default {
	name: 'NumberInput',

	props: {
		value: {
			type: Number,
			default: 0
		},
		min: {
			type: Number,
			default: Infinity
		},
		max: { 
			type: Number,
			default: -Infinity
		},
		step: {
			type: Number,
			default: 1
		},
		fixed: {
			type: Number,
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		placeHolder: {
			type: String,
			default: '请输入数字'
		}
	},

	data() {
		return {
			currValue: 0,
			blurValue: null,
			upDisabled: false,
			downDisabled: false
		}
	},

	methods: {
		handleChange(e) {
			const v = Number(e.target.value)
			if(isNaN(v)) {
				return false
			}
			this.blurValue = this.fix(e.target.value)
		},
		handleUp() {
			const v = this.fix(this.currValue) + 1
			const max = this.max
			if(v >= max) {
				v = max
				this.upDisabled = true 
			} else {
				this.upDisabled = false
			}
			this.currValue = v

		},
		handleDown() {
			const v = this.fix(this.currValue) - 1
			const min = this.min
			if(v <= min) {
				v = min 
				this.downDisabled = true
			} else {
				this.downDisabled = false
			}
			this.currValue = v
		},
		handleFocus() {
			console.log('foc')
		},
		handleBlur() {
			this.currValue = this.blurValue
		},
		fix(v) {
			return Number(Number(v).toFixed(this.fixed)) 
		},
		changeValue (v) {
		
		}
	},

	watch: {
		value (v) {
			this.currentValue = v
		},
		currentValue (v) {
			this.changValue(v)
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