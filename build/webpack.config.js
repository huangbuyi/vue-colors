var path = require('path');
var webpack = require('webpack')

module.exports = {
	entry: path.resolve(__dirname, '../example/index.js'),
	output: {
		path: path.resolve(__dirname, '../example/build'),
		//publicPath: 'http://127.0.0.1:8081/examples/build',
		filename: 'bundle.js'
	},
	resolve: {
    extensions: ['.js', '.vue']
  },
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		},{
			test: /\.vue$/,
			loader: 'vue-loader'
		},{
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		},{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},{
			test: /\.json$/,
			loader: 'json-loader'
		},{
			test: /\.md$/,
			loader: 'raw-loader'
		}]
	}
}	

			