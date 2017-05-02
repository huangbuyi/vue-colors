var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.config.js')

process.env.NODE_ENV = 'production'

module.exports = merge(config, {
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/dist/',
		filename: 'vueColorPicker.min.js',
		library: 'VueColorPicker',
		libraryTarget: 'umd'
	},
	externals: {
		vue: {
			root: 'vue',
			commonjs: 'vue',
			commonjs2: 'vue',
			amd: 'vue'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin()	
	]
})