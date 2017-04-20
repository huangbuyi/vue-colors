<template>
	<Locator2d 
		:style='style'
		@change='handleChange'
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
		color: {
			type: Array,
			default: function () {
				return [255,1,1]
			}
		},
		model: {
			validator(v) {
				return ['r','g','b','h','s','v','l'].indexOf(v) > -1
			},
			default: 's'
		},
	},
	computed: {
		style () {
			return {
				background: getBackground2d(this.model, this.color)
			}
		}
	},
	methods: {
		handleChange(p) {
			console.log(this.getColor(p))
		},
		getColor(p) {
	    let {color, model} = this
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
	  getPosition () {
	    let {color, model} = this
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
	}
}

</script>

<style>
</style>