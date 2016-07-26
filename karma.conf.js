var webpackConfig = require('./webpack.config.js');
var path = require('path');

webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      {
        pattern: './test/unit/**/*.spec.js',
        watched: false,
        included: true,
        served: true
      }
    ],
    colors: true,
    port: 9876,
    preprocessors: {
      './src/**/*.js': ['webpack'],
      './test/unit/**/*.spec.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    autoWatch: true,
    autoWatchBatchDelay: 1000,
    logLevel: config.LOG_INFO,
    reporters: ['mocha'],
    browsers: ['PhantomJS'],
    singleRun: false,
    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-phantomjs-launcher-nonet',
      require('karma-webpack')
    ],
    phantomjsLauncher: {
      cmd: {
        linux: path.join(__dirname, 'node_modules/phantomjs/bin/phantomjs'),
        darwin: path.join(__dirname, 'node_modules/phantomjs/bin/phantomjs')
      }
    },
  });
};