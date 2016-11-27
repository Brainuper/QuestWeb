var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('styles.css');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'es2015', 'stage-0', 'react'
          ],
          plugins: ['transform-export-extensions']
        }
      }, {
        test: /\.styl$/,
        loader: extractCSS.extract(['css','stylus'])
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    extractCSS
  ],
  resolve: {
    root: path.resolve('src'),
    // modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.css', '.styl']
  }
};
