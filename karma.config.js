var webpackConfig = require('./webpack.config.js');
module.exports = function(config) {
  config.set({

    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*.test.js': ['webpack']
    },

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      // all files ending in 'test'
      'test/**/*.test.js'
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha'],

    reporters: ['progress', 'coverage'],
    //reporters: ['progress'],

    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [
        // these reporters are incompatible with `istanbul-instrumenter-loader v1.0.0`
        // use `v0.2.0` instead if you need to use these reporters
          { type: 'html' },
          { type: 'text' },
          { type: 'text-summary' }
      ]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true
    },

    plugins: [
      'karma-webpack',
      'karma-babel-preprocessor',
      'istanbul-instrumenter-loader',
      'karma-mocha',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-spec-reporter'
    ],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['PhantomJS'],
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};