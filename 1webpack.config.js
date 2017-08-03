const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/js/script.js',
	output: {
		path: __dirname + '/dist/js',
		filename: 'script.js'
	},
	module: {
		loaders: [
			{
				test: /.jsx?$/,
        		loader: 'babel-loader',
        		exclude: /node_modules/, 
        		query: {
        			presets: ['react', 'es2015']
        		}
			}
		]
	},

	devtool: 'source-map'
};