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
      dir: 'coverage/custom',
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

    customLaunchers: {
      VirtualBoxIE11onWin8: {
        base: 'VirtualBoxIE11',
        keepAlive: true,
        snapshot: 'pristine',
        uuid: '746736b9-a017-4a0f-8084-c42cfdf6189a'
      }
    },

    plugins: [
      'karma-webpack',
      'karma-babel-preprocessor',
      'istanbul-instrumenter-loader',
      'karma-mocha',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-virtualbox-ie11-launcher'
    ],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['Chrome', 'Firefox', 'Safari', 'PhantomJS', 'VirtualBoxIE11onWin8']
  });
};