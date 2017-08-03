const webpack = require('webpack');

module.exports = {
  entry: './admin-panel/src/script.js',
  output: {
    path: __dirname + '/admin-panel/js',
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