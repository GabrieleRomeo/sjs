const webpack = require('webpack');
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
const libraryName = 'sjs';

module.exports = {
  devtool: debug ? 'inline-sourcemap' : 'cheap-module-source-map',
  entry: path.join(__dirname, 'src/sjs.js'),
  output: {
    path: path.join(__dirname, 'build/'),
    filename: debug ? 'sjs.js' : 'sjs.min.js',
    publicPath: '/build/',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test')
        ],
        loader: 'babel-loader',
        query: {
          presets:['es2015', 'stage-2']
        }
      },
      {
        enforce: 'post',
        test: /\.js/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true }
        },
        exclude: /(test|node_modules|bower_components)/,
      }
    ]
  },

  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],

};
