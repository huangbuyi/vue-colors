<template>
	<div>
		<NumberInput :value='rgb[0]' :min='a0' :max='a255' @change='handleRChange'/>
		<NumberInput :value='rgb[1]' :min='a0' :max='a255' @change='handleGChange'/>
		<NumberInput :value='rgb[2]' :min='a0' :max='a255' @change='handleBChange'/>
		<NumberInput :value='hsv[0]' :min='a0' :max='a360' @change='handleHChange'/>
		<NumberInput :value='hsv[1]' :min='a0' :max='a100' @change='handleSChange'/>
		<NumberInput :value='hsv[2]' :min='a0' :max='a100' @change='handleVChange'/>
		<button @click='handleClick'>+</button>
		<div class='vc-model'>
			<ul>
				<li 
					v-for='m in allModel' 
					:class='model === m ? "vc-model-selected" : ""'
				>
					<div @click='e => handleModelChange(m)'>{{ m.toUpperCase() }}</div>
				</li>
			</ul>
		</div>
		<ColorLocator2d :model='model'/>
		<ColorSlider :value='rgb[0]' :min='a0' :max='a255' :beforeStyle='style.slider1_before' @change='handleRChange'/>
		<ColorSlider :value='rgb[1]' :min='a0' :max='a255' :beforeStyle='style.slider2_before' @change='handleGChange'/>
		<ColorSlider :value='rgb[2]' :min='a0' :max='a255' :beforeStyle='style.slider3_before' @change='handleBChange'/>
		<ColorSlider :value='hsv[0]' :min='a0' :max='a360' :beforeStyle='style.slider4_before' :trackStyle='style.slider4_track' @change='handleHChange'/>
		<ColorSlider :value='hsv[1]' :min='a0' :max='a100' :beforeStyle='style.slider5_before' :trackStyle='style.slider5_track' @change='handleSChange'/>
		<ColorSlider :value='hsv[2]' :min='a0' :max='a100' :beforeStyle='style.slider6_before' :trackStyle='style.slider6_track' @change='handleVChange'/>
		<div class='vc-buttons'>
			<button class='vc-buttons-accept'>确定</button>
			<button class='vc-buttons-cancel'>取消</button>
			<button class='vc-buttons-number'>数字输入</button>
			<button class='vc-buttons-palette'>色</button>
		</div>
	</div>
</template>

<script>
import NumberInput from '../src/components/NumberInput'
import ColorLocator2d from '../src/components/ColorLocator2d'
import ColorSlider from '../src/components/ColorSlider'
import chroma from 'chroma-js'

export default {
	components: {
		NumberInput,
		ColorLocator2d,
		ColorSlider
	},
	data () {
		return {
			value: 2,
			chroma: null,
			color: [255,0,0,1],
			model: 'r',
			allModel: ['r','g','b','h','s','v'],
			activeModel: 'rgb',
			a0: 0, 
			a100: 100, 
			a255: 255, 
			a360: 360,
		}
	},
	computed: {
		sliderStyle() {
			return {
				background: 'red'
			}
		},
		rgb() {
			return this.chroma.rgb()
		},
		hsl() {
			console.log(this.chroma.hsl())
			return this.chroma.hsl()
		},
		hsv() {
			let hsv = this.chroma.hsv()
			hsv[0] = hsv[0] || 0
			hsv[1] *= 100
			hsv[2] *= 100
			return hsv
		},
		style () {

		  return {
				slider1_before: {
					background: 'red'
				},
				slider2_before: {
					background: '#0f0'
				},
				slider3_before: {
					background: 'blue'
				},
				slider4_before: {
					background: 'transparent'
				},
				slider4_track: {
					background: 'linear-gradient(to right, hsl(0,100%,50%) 0%, hsl(60,100%,50%) 17%, hsl(120,100%,50%) 33%, hsl(180,100%,50%) 50%, hsl(240,100%,50%) 67%, hsl(300,100%,50%) 83%, hsl(360,100%,50%) 100%)'
				},
				slider5_before: {
					background: 'transparent'
				},
				slider5_track: {
					background: `linear-gradient(to right, hsl(${ this.hsl[0] },100%,100%), hsl(${ this.hsl[0] },100%,50%) )`
				},
				slider6_before: {
					background: 'transparent'
				},
				slider6_track: {
					background: `linear-gradient(to right, hsl(${ this.hsl[0] },100%,0%), hsl(${ this.hsl[0] },100%,50%), hsl(${ this.hsl[0] },100%,100%) )`
				},
			}
		}
	},
	methods: {
		handleModelChange (newModel) {
			if(newModel !== this.model) {
				this.model = newModel
			}
		},
		handleClick () {
			this.value += 1
		},
		handleChange(v, type) {
			this.chroma = this.chroma.set(type, v)
		},
		handleRChange(v) {
			this.handleChange(v, 'rgb.r')
		},
		handleGChange(v) {
			this.handleChange(v, 'rgb.g')
		},
		handleBChange(v) {
			this.handleChange(v, 'rgb.b')
		},
		handleHChange(v) {
			this.handleChange(v, 'hsv.h')
		},
		handleSChange(v) {
			this.handleChange(v / 100, 'hsv.s')
		},
		handleVChange(v) {
			this.handleChange(v / 100, 'hsv.v')
		},
	},
	beforeMount() {
		this.chroma = chroma(this.color)
	}
}
</script>

<style>
body {margin:0; padding:0;}

.vc-model ul {
	list-style: none;
	display: flex;
	justify-content: center;
	padding: 0;
}
.vc-model li {
	display: inline-block;
	overflow: hidden;
	padding: 6px 0;
}
.vc-model li div {
	cursor: pointer;
	border-right: 1px solid #f0f0f0;
	background: #fff;
	text-align: center;
	color: rgba(0,0,0,0.87);
	width: 46px;
	height: 30px;
	line-height: 30px;
	box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 3px, rgba(0, 0, 0, 0.117647) 0px 1px 2px;
	transition: all 125ms cubic-bezier(0.4,0,0.6,1);
}
.vc-model li:first-child {
	border-radius: 4px 0 0 4px;
}
.vc-model li:first-child div {
	border-radius: 4px 0 0 4px;
}
.vc-model li:last-child {
	border-radius: 0 2px 2px 0;
}
.vc-model li:last-child div {
	border-radius: 0 2px 2px 0;
}
li.vc-model-selected div{
	cursor: default;
	color: rgba(0,0,0,0.33);
	background: #f0f0f0;
	box-shadow: rgba(0,0,0,0.18) 0 1px 1px;
}

.vc-buttons {
	font-size: 0;
}
.vc-buttons button {
	box-sizing: border-box;
	min-width: 88px;
	height: 36px;
	padding: 0 8px;
	box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;
	box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 3px, rgba(0, 0, 0, 0.117647) 0px 1px 2px;
	background: #fff;
	border-bottom: 2px;
	border: none;
	margin: 8px 0 8px 8px;
	color: rgba(0,0,0,0.87);
}
button.vc-buttons-accept {
	background: #2196f3;
	color: #fff;
}
button.vc-buttons-number {
	position: absolute;
	right: 52px;
}
button.vc-buttons-palette {
	position: absolute;
	right: 8px;
	min-width: 0;
	width: 36px;
}
</style>