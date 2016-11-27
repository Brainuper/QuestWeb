var webpack = require('webpack');
var merge = require('webpack-merge');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var common = require('./webpack-common.config');

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER:  JSON.stringify(true),
      NODE_ENV: JSON.stringify('production')
    }
  })
  // ,
  // new ExtractTextPlugin('styles-[hash].css')
];

var prodConfig = {
  entry: './src/index',
  output: {
    path: path.resolve('public/assets'),
    filename: 'bundle-[hash].js',
    publicPath: '/'
  },
  plugins
};

module.exports = merge(common, prodConfig);
