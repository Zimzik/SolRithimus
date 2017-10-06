const webpack = require('webpack');

module.exports = {
  entry: './front-end/admin-panel/js/script.js',
  output: {
    path: __dirname + '/public/admin-panel/js',
    filename: 'script.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
          compact: false
        }
      }
    ]
  },

  devtool: 'source-map'
};