<template>
	<div class='vc-root'>
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
		<ColorLocator2d :color='currColor' :model='model' @change='handleChange'/>
		<div class='controls'>
			<transition name='panel'>
				<div class='panel' key='sliders' v-if='view === 1'>
					<ColorSlider :value='rgb[0]' :min='a0' :max='a255' :beforeStyle='style.slider1_before' @change='handleRChange'/>
					<ColorSlider :value='rgb[1]' :min='a0' :max='a255' :beforeStyle='style.slider2_before' @change='handleGChange'/>
					<ColorSlider :value='rgb[2]' :min='a0' :max='a255' :beforeStyle='style.slider3_before' @change='handleBChange'/>
					<ColorSlider :value='hsv[0]' :min='a0' :max='a360' :beforeStyle='style.slider4_before' :trackStyle='style.slider4_track' @change='handleHChange'/>
					<ColorSlider :value='hsv[1]' :min='a0' :max='a100' :beforeStyle='style.slider5_before' :trackStyle='style.slider5_track' @change='handleSChange'/>
					<ColorSlider :value='hsv[2]' :min='a0' :max='a100' :beforeStyle='style.slider6_before' :trackStyle='style.slider6_track' @change='handleVChange'/>
				</div>
				<div class='panel' key='numbers' v-if='view === 0'>
					<NumberInput :value='rgb[0]' :min='a0' :max='a255' @change='handleRChange'/>
					<NumberInput :value='rgb[1]' :min='a0' :max='a255' @change='handleGChange'/>
					<NumberInput :value='rgb[2]' :min='a0' :max='a255' @change='handleBChange'/>
					<NumberInput :value='hsv[0]' :min='a0' :max='a360' @change='handleHChange'/>
					<NumberInput :value='hsv[1]' :min='a0' :max='a100' @change='handleSChange'/>
					<NumberInput :value='hsv[2]' :min='a0' :max='a100' @change='handleVChange'/>
				</div>
			</transition>
		</div>
		<transition name='palette'>
			<div v-if='showPalette' class='palette'>
				Color Palette
				<button @click='() => this.showPalette = false'>返回</button>
			</div>
		</transition>
		<div class='vc-buttons'>
			<button class='vc-buttons-accept'>确定</button>
			<button class='vc-buttons-cancel'>取消</button>
			<button class='vc-buttons-number' @click='() => this.view = 1' v-if='view === 0'>滑动输入</button>
			<button class='vc-buttons-number' @click='() => this.view = 0' v-if='view === 1'>数字输入</button>
			<button class='vc-buttons-palette' @click='() => this.showPalette = true'>色</button>
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
	props: {
		color: {
			type: String,
			default: 'pink'
		}
	},
	data () {
		return {
			currColor: null,
			chroma: null,
			model: 'r',
			allModel: ['r','g','b','h','s','v'],
			activeModel: 'rgb',
			view: 0,
			showPalette: false,
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
			return this.currColor.rgb
		},
		hsl() {
			return this.currColor.hsl
		},
		hsv() {
			let hsv = this.currColor.hsv
			return [hsv[0] || 0, hsv[1]*100, hsv[2]*100]
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
				}
			}
		}
	},
	methods: {
		handleModelChange (newModel) {
			if(newModel !== this.model) {
				this.model = newModel
			}
		},
		handleChange(v, model) { 
			this.currColor = this.getColors(v, model)                     
		},
		getColors (color, model) {
			if( model ) {
				this.chroma = this.chroma.set(model, color)
			} 
			let c = this.chroma
			return Object.assign({
				rgb: c.rgb(),
				hsv: c.hsv(), 
				hsl: c.hsl()
			}, {[model]: color})
		},
		handleRChange(v) {
			let rgb = this.currColor.rgb
			this.handleChange([v, rgb[1], rgb[2]], 'rgb')
		},
		handleGChange(v) {
			let rgb = this.currColor.rgb
			this.handleChange([rgb[0], v, rgb[2]], 'rgb')
		},
		handleBChange(v) {
			let rgb = this.currColor.rgb
			this.handleChange([rgb[0], rgb[1], v], 'rgb')
		},
		handleHChange(v) {
			let hsv = this.currColor.hsv
			this.handleChange([v, hsv[1], hsv[2]], 'hsv')
		},
		handleSChange(v) {
			let hsv = this.currColor.hsv
			this.handleChange([hsv[0], v/100, hsv[2]], 'hsv')
		},
		handleVChange(v) {
			let hsv = this.currColor.hsv
			this.handleChange([hsv[0], hsv[1], v/100], 'hsv')
		}
	},
	beforeMount() {
		this.chroma = chroma(this.color)
		this.currColor = this.getColors(this.color)
	}
}
</script>

<style>
body {margin:0; padding:0;}
.vc-root {
	position: relative;
}
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

.controls {
	box-sizing: border-box;
	position: relative;
	height: 248px;
}
.panel {
	box-sizing: border-box;
	position: absolute;
	left: 0;
	right: 0;
	padding: 12px;
}

.panel-enter-active,.panel-leave-active {
	transition: all 425ms cubic-bezier(0.4,0,0.6,1);
}
.panel-enter {
	transform: translate(100%, 0);
}
.panel-leave-to {
	transform: translate(-100%, 0);
}

.palette {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	z-index: 1;
	opacity: 1;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.23), 0 10px 40px rgba(0, 0, 0, 0.19);
	background: #fff;
}


.palette-enter-active {
  transition: width 275ms cubic-bezier(0.4, 0.0, 0.6, 1) 0ms,height 300ms cubic-bezier(0.4, 0.0, 0.6, 1) 35ms,box-shadow 275ms cubic-bezier(0.4, 0.0, 0.6, 1) 0ms, opacity 375ms cubic-bezier(0.6,0,1,0.5);
}

.palette-leave-active {
	transition: width 300ms cubic-bezier(0.4, 0.0, 0.6, 1) 35ms,height 275ms cubic-bezier(0.4, 0.0, 0.6, 1) 0ms,box-shadow 275ms cubic-bezier(0.4, 0.0, 0.6, 1) 0ms, opacity 325ms cubic-bezier(0.4,0,0.6,1);
}
.palette-enter {
	width: 0;
	height: 0;
	opacity: 0;
}
.palette-leave-to {
	width: 0;
	height: 0;
	opacity: 0;
}
</style>