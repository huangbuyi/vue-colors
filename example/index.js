import Vue from 'vue'
import NumberInput from '../src/components/NumberInput'

var vm = new Vue({
	el: '#app',
	render: h => h(NumberInput)
})