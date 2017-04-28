<template>
	<div class='vc-color-picker'>
		<div @click='handleClick'>
			<slot>
				<div class='vc-target' :style='{background: targetColor}'></div> 
			</slot>
		</div>
		<div class='vc-container'>
			<transition name='opacity'>
				<div v-if='currVisible' class='vc-mask'></div>
			</transition>
			<transition name='raise'>
			<div v-if='currVisible' class='vc-root'>
				<div class='vc-base' :style='{filter: showPalette ? "blur(5px)": "unset"}'>
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
					<div class='vc-color2d'>
						<ColorLocator2d :color='currColor' :model='model' @change='handleChange'/>
					</div>

					<div class='controls'>
						<transition name='panel'>
							<div class='panel' key='sliders' v-if='view === 1'>
								<ColorSlider label='R' :value='rgb[0]' :min='a0' :max='a255' :beforeStyle='style.slider1_before' @change='handleRChange'/>
								<ColorSlider label='G' :value='rgb[1]' :min='a0' :max='a255' :beforeStyle='style.slider2_before' @change='handleGChange'/>
								<ColorSlider label='B' :value='rgb[2]' :min='a0' :max='a255' :beforeStyle='style.slider3_before' @change='handleBChange'/>
								<div class='vc-space'></div>
								<ColorSlider label='H' :value='hsv[0]' :min='a0' :max='a360' :beforeStyle='style.slider4_before' :trackStyle='style.slider4_track' @change='handleHChange'/>
								<ColorSlider label='S' :value='hsv[1]' :min='a0' :max='a100' :beforeStyle='style.slider5_before' :trackStyle='style.slider5_track' @change='handleSChange'/>
								<ColorSlider label='B' :value='hsv[2]' :min='a0' :max='a100' :beforeStyle='style.slider6_before' :trackStyle='style.slider6_track' @change='handleVChange'/>
							</div>
							<div class='panel' key='numbers' v-if='view === 0'>
								<div class='vc-numbers'>
									<div class='vc-number-container'>
										<NumberInput label='R' :value='rgb[0]' :min='a0' :max='a255' @change='handleRChange'/>
										<NumberInput label='G' :value='rgb[1]' :min='a0' :max='a255' @change='handleGChange'/>
										<NumberInput label='B' :value='rgb[2]' :min='a0' :max='a255' @change='handleBChange'/>
									</div>
									<div class='vc-number-container'>
										<NumberInput label='H' :value='hsv[0]' :min='a0' :max='a360' @change='handleHChange'/>
										<NumberInput label='S' :value='hsv[1]' :min='a0' :max='a100' @change='handleSChange'/>
										<NumberInput label='V' :value='hsv[2]' :min='a0' :max='a100' @change='handleVChange'/>
									</div>
									<div class='vc-number-container'>
										<NumberInput label='H' :value='hsv[0]' :min='a0' :max='a360' @change='handleHChange'/>
									</div>
									<div class='vc-number-container'>
										<NumberInput label='H' :value='hsv[0]' :min='a0' :max='a360' @change='handleHChange'/>
									</div>
								</div>
							</div>
						</transition>
					</div>
					<div class='vc-buttons'>
						<button class='vc-buttons-accept' @click='handleAccept'>确定</button>
						<button class='vc-buttons-cancel' @click='handleCancel'>取消</button>
						<button class='vc-buttons-number' @click='() => this.view = 1' v-if='view === 0'>滑动输入</button>
						<button class='vc-buttons-number' @click='() => this.view = 0' v-if='view === 1'>数字输入</button>
						<button class='vc-buttons-palette' @click='() => this.showPalette = true'></button>
					</div>
				</div>
				<transition name='palette'>
					<div v-if='showPalette' class='palette'>
						<div class='colors'>
							<p class='label'>History</p>
							<ul class='historyColors'>
								<li v-for='color in historyColors' :style='{background: color}' @click='e => handleCardClick(color)' class='vc-palette-card'></li>
							</ul>
							<p class='label'>Material</p>
							<ul>
								<li v-for='colors in materialColors'>
									<div>
										<ul>
											<li v-for='color in colors' :style='{background: color[1]}' @click='e => handleCardClick(color[1])'  class='vc-palette-card'></li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
						<div class='header'>
							<button class='close' @click='() => this.showPalette = false'>
								<svg width="20" version="1.1" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 64 64" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 64 64"><g><path fill="#ccc" d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/></g></svg></path>
							</button>
						</div>
					</div>
				</transition>
			</div>
			</transition>
		</div>
	</div>
</template>

<script>
import NumberInput from '../NumberInput'
import ColorLocator2d from '../ColorLocator2d'
import ColorSlider from '../ColorSlider'
import chroma from 'chroma-js'
import materialColors from '../../utils/materialColors'

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
		},
		colorModel: String,
		visible: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			currVisible: null,
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
			materialColors,
			historyColors: []
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
		handleClick() {
			this.currVisible = true
		},
		handleModelChange (newModel) {
			if(newModel !== this.model) {
				this.model = newModel
				this.$emit('modelChange', this.model)
			}
		},
		handleChange(v, model) { 
			this.currColor = this.getColors(v, model)  
			this.$emit('change', this.currColor)                   
		},
		getColors (color, model) {
			if( model ) {
				this.chroma = this.chroma.set(model, color)
			} 
			let c = this.chroma
			return Object.assign({
				rgb: c.rgb(),
				hsv: c.hsv(), 
				hsl: c.hsl(),
				hex: c.hex()
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
		},
		handleAccept() {
			this.historyColors.unshift(this.currColor.hex)
			this.historyColors.length > 16 && this.historyColors.pop()
			this.currVisible = false
			this.targetColor = this.currColor.hex
			this.$emit('accept', this.currColor)
			this.$emit('close', false)
		},
		handleCancel() {
			this.currVisible = false
			this.$emit('cancel')
			this.$emit('close', false)
		},
		handleCardClick(v) {
			this.handleChange(v, 'hex')
			this.showPalette = false
		},
		setColor(v, model) {
			this.chroma = chroma(this.color)
			this.currColor = this.getColors(this.color)
		}
	},
	watch: {
		color(v) {
			this.setColor(v, this.colorModel)
		},
		visible(v) {
			this.currVisible = v
		}
	},
	beforeMount() {
		this.setColor(this.color, this.colorModel)
		this.targetColor = this.currColor.hex
	}
}
</script>

<style>
body {margin:0; padding:0;}
.vc-color-picker {
	display: inline-block;
}
.vc-target {
	width: 32px;
	height: 32px;
}
.vc-container {
	position: fixed;
	bottom: 0;
  left: 0;
  right: 0;
	display: flex;
	justify-content: center;
}
.vc-root {
	position: relative;
	font-family: Consolas;
	background: #fff;
	width: 100%;
	max-width: 768px;
}
.vc-root button {
	cursor: pointer;
}
.vc-base {
	transition: all 375ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
.vc-root ul {
	list-style: none;
	padding: 0;
	margin: 0;
}
.vc-root li {
	display: inline-block;
}
.vc-model ul {
	display: flex;
	justify-content: center;
}
.vc-model li {
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
	transition: all 125ms cubic-bezier(0.4, 0.0, 0.2, 1);
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
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAACmAAAApgHdff84AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAoJQTFRF////AAAADSZNCidFCSZMBihKCilHCSpGvcXOBylGBipHCSpIBypIBypIBylHpsrmByhICChGbpGuCClHIDNGDStHCyxKGz1a1dfVCClHCytJJk9y3l4rWiMz0nAyCyxKFTlZVD87W1BIW3GGYVNIQVlsSTw8TSE0TXGDYjVIaUQ2aX2PbHyF/51JNVduPTBJSmyJXoGQcH+IL1FpN2SKOWWLPGqRfkozCitIDC5LKkxlNj9HNlFphUwyCjBREEVrEEVsKEpiLi5IMEROLzxHL0JOL0tkbpKekGlIkJ6sK0ZbQHCXjDtJ7rxtKDhIKERflqSx////mm5JCixKGz5eHD5ZZ4qme5+qoFIsDzFODzJOIjpMIzBDHi1IITVIfhwnGTtWE011HTxWg6exFE94FihEGStICytKEDFPFDVQFDZRFTROFTVOFTVPFTZRFjlUGTZQs3pJEDFNFS9HGS9FbKOprLKtCSlIDC1MFDNREylEEzNPEzRQES5JFSxGFS5GFjRQCC1LCitJDTBPDilGEDRPETNREjRRFC9IFDFMc6yxhKjEtkBLETJPEy1ICyxKDzFMETJPEjBKEjJPEzJPFC5HDi9M2rV1ydDXwUJLDjBNFVWBe7a4z61tDS5LyMi+DS1K1bBu3UVKCixKgr2+2N3jCCpICSpICixJCy1KX5XB22QjCixK4I9J4Lhv4OToCSlHJElqjc3L4UZL7ZVJ4d3PCClIaqPQ72ogaKLP8Wof8uvZ9Wsf6UZL95hJ9/j5lNTR+JpJ+Pn5+JpJ+Wwe7ufWuxUW7+nX/JxJGF+M/W0d/m4dGF+NbajWmNnVp8vm8khL8uvZ/24d/51J/8x1////VR+fxQAAAMx0Uk5TAAEUGhstMjc+RU9VZ25vh4uYnqKusLOzuru8vLy9vb6/v7+/v8DAwMDAwMDAwMHBwcHBwsLCwsLDw8PDw8PExMTExMTFxcXFxcXGxsbGx8fHx8jJycnJycnKysrKy8vLzM3Nzc7Ozs/Pz8/Pz8/Pz8/P0NDQ0NDR0dHS0tLT09PT1NTU1NTU1NTU1NTU1dXW1tbW1tbW19fZ2tvb29zd3d/f3+Dg4eLi4uLi4uTl5eXq7u7u7u/x8fHz8/T09vb29/f3+Pn6/Pz8/f3+AJDwYgAAAXlJREFUKFNj4LRsBQJ5dgZ0YHngHBBsEmNg4OJjRZZoPQcGkQx8K91DBZkwJVgqPScbhhfxYEhwLL26X7km2ZEbTSIq8CoQrHfrFUCTyJLQPgSSsuFCk8g7bjQl4OrVpVKMXALcKBIXL25VTZrhzyZqnaDHgypx8eL8BhHdE5ddkouYEBKZu4ESRzvltly+vLY6XBAhkTu9oOyijtbquMuXLysZhrIiJK6sc/bqOHJJLejy5X2T3PmQJK5ccY24dGlH/eHLlz1WciFLzI2VOX3pkrnK5cJiXoQdOb4Lo2dq2l66dKrET5gZybnZW6bqX9hbt2uPYoYQv3iFJDtc4mDf5gsXfGJqzVZ1nz8fZmUBkpizBCihIrvoQk+a9M6z3gZACY12oETXxFlLzk2oOpbqZDd7+1kkidL8iXPOzYtXT08542CKLHGutOvcuWktCifPnLE3QUhAE0P/xpBEJAnjYAZI8tm2oWn5ssbGZSuamxevaWtbUM4JAO+VDyGJNYY6AAAAAElFTkSuQmCC");
	background-repeat: no-repeat;
	background-size: 24px 24px;
	background-position: center;
}

.controls {
	box-sizing: border-box;
	position: relative;
	height: 248px;
	overflow: hidden;
}
.panel {
	box-sizing: border-box;
	position: absolute;
	left: 0;
	right: 0;
	padding: 12px;
	height: 100%;
}
.vc-numbers {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	align-items: center;
	height: 100%;
}
.vc-number-container {
	margin-bottom: 12px;
}

.panel-enter-active,.panel-leave-active {
	transition: all 425ms cubic-bezier(0.4, 0.0, 0.2, 1);
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
	background: rgba(250,250,250,0.3);
	box-sizing: border-box;
	overflow: hidden;
}
.palette .colors {
	box-sizing: border-box;
	height: 100%;
	overflow: auto;
	padding: 36px 0 72px 0;
}

.palette .label{
	font-size: 16px;
	color: rgba(0,0,0,0.67);
	padding-left: 18px;
	margin: 14px 0 0 0;
}


.palette-enter-active {
  transition: width 275ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms,height 300ms cubic-bezier(0.4, 0.0, 0.2, 1) 35ms,box-shadow 275ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms, opacity 375ms cubic-bezier(0.4,0,0.2,1);
}

.palette-leave-active {
	transition: width 300ms cubic-bezier(0.4, 0.0, 0.2, 1) 35ms,height 275ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms,box-shadow 275ms cubic-bezier(0.4, 0.0, 0.2, 1) 0ms, opacity 325ms cubic-bezier(0.4,0,0.2,1);
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
.palette ul {
	display: flex;
	justify-content: left;
	flex-wrap: wrap;
	padding: 18px 0 0 18px;
}
.palette ul ul {
	padding: 18px 0 0 0;
}
.palette .header {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 36px;
	background: linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0));
}
.palette .close {
	position: absolute;
	top: 0;
	right: 0;
	background: transparent;
	border: none;
	outline: none;
	padding: 8px;
}

.vc-palette-card {
	width: 30px;
	height: 30px;
	margin: 0 18px 18px 0;
	border: 1px solid rgba(0,0,0,0.3);
	border-radius: 2px;
}

.raise-enter-active {
  transition: all 375ms cubic-bezier(0.4,0,0.6,1);
}

.raise-leave-active {
	transition: all 375ms cubic-bezier(0.4,0,0.6,1);
}
.raise-enter {
	transform: translate(0, 100%);
}
.raise-leave-to {
	transform: translate(0, 100%);
}

.vc-mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0,0,0,0.24);
}
.opacity-leave-active, .opacity-enter-active {
	transition: all 375ms cubic-bezier(0.4,0,0.6,1);
}
.opacity-enter {
	opacity: 0;
}
.opacity-leave-to {
	opacity: 0;
}

.vc-space {
	height: 12px;
}

</style>