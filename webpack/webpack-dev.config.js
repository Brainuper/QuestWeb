var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var common = require('./webpack-common.config');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');

var devConfig = {
  entry: {
    client: ['./src/client', 'webpack-dev-server/client?http://localhost:9000', 'webpack/hot/only-dev-server']
  },
  output: {
    path: path.resolve('dist/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      '__DEV__': true
    }),
    new HtmlWebpackPlugin({template: 'src/index.html', inject: 'body'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'eval-source-map',
  debug: true
};

module.exports = merge(common, devConfig);
