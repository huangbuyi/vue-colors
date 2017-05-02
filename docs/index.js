import Vue from 'vue'
import Test from './index.vue'


var vm = new Vue({
	el: '#app',
	render: h => h(Test),
})