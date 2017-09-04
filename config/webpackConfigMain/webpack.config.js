const webpack = require('webpack');

module.exports = {
	entry: './public/main-page/app/js/script.js',
	output: {
		path: __dirname + 'public/main-page/dist/js',
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