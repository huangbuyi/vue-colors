var path = require('path')
var webpack = require('webpack')
var merge = require('webpack-merge')
var config = require('./webpack.config.js')

process.env.NODE_ENV = 'production'

module.exports = merge(config, {
	entry: {
		main: './docs/index.js'
	},
	output: {
		path: path.resolve(__dirname, '../docs'),
		publicPath: '/docs/',
		filename: 'bundle.js',
	}
})