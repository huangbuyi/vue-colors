<template>
	<Locator2d 
		:locationX='location.leftP'
		:locationY='location.topP'
		:style='style'
		@change='handleChange'
		:colorStyle='{background: color.hex}'
	/>
</template>

<script>
import Locator2d from './Locator2d'
import getBackground2d from '../../utils/getBackground2d'



export default {
	components: {
		Locator2d
	}, 
	props: {
		color: Object,
		model: {
			validator(v) {
				return ['r','g','b','h','s','v','l'].indexOf(v) > -1
			},
			default: 's'
		},
	},
	data() {
		return {
			currColor: null
		}
	},
	computed: {
		style() {
			return {
				background: getBackground2d(this.model, this.currColor)
			}
		},
		location() {
			return this.getPosition(this.currColor, this.model)
		},
	},
	methods: {
		handleChange(p) {
			this.$emit('change', this.getColor(p, this.currColor, this.model), this.getModel(this.model))
		},
		getColor(p, color, model) {

	    let newColor = {
	      'r': [color[0], 255 - p.topP * 255, p.leftP * 255],
	      'g': [255 - p.topP * 255, color[1], p.leftP * 255],
	      'b': [p.leftP * 255, 255 - p.topP * 255, color[2]],
	      'h': [color[0], p.leftP, 1 - p.topP],
	      's': [p.leftP * 360, color[1], 1 - p.topP],
	      'v': [p.leftP * 360, 1 - p.topP, color[2]],
	    }
	    return newColor[model]
	  },
	  getModel(v) {
	  	if('rgb'.indexOf(v) > -1){
	  		return 'rgb'
	  	}
	  	if('hsv'.indexOf(v) > -1){
	  		return 'hsv'
	  	}
	  },
	  getPosition (color, model) {
	    let position = {
	      'r': {
	        leftP: color[2] / 255,
	        topP: 1 - color[1] / 255
	      },
	      'g': {
	        leftP: color[2] / 255,
	        topP: 1 - color[0] / 255
	      },
	      'b': {
	        leftP: color[0] / 255,
	        topP: 1 - color[1] / 255
	      },
	      'h': {
	        leftP: color[1],
	        topP: 1 - color[2]
	      },
	      's': {
	        leftP: color[0] / 360,
	        topP: 1 - color[2]
	      },
	      'v': {
	        leftP: color[0] / 360,
	        topP: 1 - color[1]
	      }
	    }
	    return position[model]
	  }
	},
	watch: {
		model(v) {
			this.currColor = this.color[this.getModel(v)]
		},
		color(c) {
			this.currColor = this.color[this.getModel(this.model)]
		}
	},
	beforeMount() {
		this.currColor = this.color[this.getModel(this.model)]
	}
}

</script>

<style>
</style>