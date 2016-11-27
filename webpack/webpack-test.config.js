var webpack = require('webpack');
var merge = require('webpack-merge');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var common = require('./webpack-common.config');

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      BROWSER: JSON.stringify(true),
      NODE_ENV: JSON.stringify('test')
    }
  }),
  // new ExtractTextPlugin('styles.css'),
  new webpack.NoErrorsPlugin()
];

var testConfig = {
  entry: './test.webpack',
  output: {
    path: path.resolve('tmp/test'),
    filename: '[name].spec.js'
  },
  module: {
    loaders: [
      {
        test: /sinon.*\.js$/,
        loader: "imports?define=>false,require=>false"
      }
    ]
  },
  plugins
};

module.exports = merge(common, testConfig);
