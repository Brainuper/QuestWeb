// var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
// var jasmine = require('gulp-jasmine');
var rimraf = require('gulp-rimraf');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
// var prodConfig = require('./webpack/webpack-prod.config.js');
var devConfig = require('./webpack/webpack-dev.config.js');
// var testConfig = require('./webpack/webpack-test.config.js');
var serverConfig = require('./webpack/webpack-server.config.js');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 9000;

var paths = {
  js: ['src/**/*.js'],
  src: './src',
  dist: './dist',
  tmp: './tmp',
  vendor: {
    css: './node_modules/semantic-ui-css/semantic.min.css',
    js: './node_modules/semantic-ui-css/semantic.min.js'
  }
};
// gulp.task('build-test', function(callback) {   webpack(testConfig, function(err, stats)
// {     if (err)       throw new gutil.PluginError('build-test', err);
// gutil.log('[build-test]', stats.toString({colors: true}));     callback();   }); });
//
// gulp.task('test-jasmine', ['build-test'], function() {   return
// gulp.src('tmp/test/**/*.spec.js').pipe(jasmine({verbose: true})); });
//
// gulp.task('test', function() {   gulp.watch([     'src/**/*.js', 'test/**/*.js'   ],
// ['test-jasmine']); });
gulp.task('build-server', function(callback) {
  webpack(serverConfig, function(err, stats) {
    if (err)
      throw new gutil.PluginError('build-server', err);
    gutil.log('[build-server]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('build-dev', function(callback) {
  webpack(devConfig, function(err, stats) {
    if (err)
      throw new gutil.PluginError('build-dev', err);
    gutil.log('[build-dev]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('webpack-dev-server', function() {
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(devConfig), {
    contentBase: './dist',
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false
    },
    clientLogLevel: "info"
  }).listen(PORT, HOST, function(err) {
    if (err)
      throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log('[webpack-dev-server]', 'http://' + HOST + ':' + PORT);
  });
});

gulp.task('watch-dev', function() {
  gulp.watch(['src/**/*'], ['build-dev']);
});

gulp.task('web', ['webpack-dev-server']);

gulp.task('dev', ['watch-dev']);

gulp.task('build', ['build-server', 'build-dev']);

gulp.task('clean', function() {
  return gulp.src([
    paths.dist, paths.tmp
  ], {read: false}).pipe(rimraf());
});

gulp.task('clean-libs', function() {
  return gulp.src('node_modules', {read: false}).pipe(rimraf());
});
