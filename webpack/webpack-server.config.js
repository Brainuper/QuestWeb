var webpack = require('webpack');
var merge = require('webpack-merge');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var common = require('./webpack-common.config');

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  })
];

var devConfig = {
  entry: './server',
  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },
  plugins,
  target: 'node',
  externals: [nodeExternals()]
};

module.exports = merge(common, devConfig);
