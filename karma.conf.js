var webpackConfig = require('./webpack.config.js');
var path = require('path');

webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './test/main.spec.js'
    ],
    colors: true,
    port: 9876,
    preprocessors: {
      './test/main.spec.js': ['webpack', 'sourcemap', 'coverage'],
    },
    coverageReporter: {
      // specify a common output directory
      dir: 'coverage',
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html' },
        { type: 'text'}
      ]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    autoWatch: true,
    autoWatchBatchDelay: 1000,
    logLevel: config.LOG_INFO,
    reporters: ['mocha', 'progress', 'coverage'],
    browsers: ['PhantomJS'],
    singleRun: false,
    phantomjsLauncher: {
      cmd: {
        linux: path.join(__dirname, 'node_modules/phantomjs/bin/phantomjs'),
        darwin: path.join(__dirname, 'node_modules/phantomjs/bin/phantomjs')
      }
    },
  });
};