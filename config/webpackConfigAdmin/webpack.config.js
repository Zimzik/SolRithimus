const webpack = require('webpack');

module.exports = {
  entry: './public/admin-panel/app/js/script.js',
  output: {
    path: __dirname + '/public/admin-panel/dist/js',
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