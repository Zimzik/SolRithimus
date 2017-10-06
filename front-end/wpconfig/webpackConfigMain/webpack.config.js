module.exports = {
	entry: './front-end/main-page/js/script.js',
	output: {
		path: __dirname + 'public/main-page/js',
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