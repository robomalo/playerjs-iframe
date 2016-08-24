var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var plugins = [
  new webpack.ProvidePlugin({
    'Promise': 'core-js/es6/promise'
  }),
  new webpack.ProvidePlugin({
    'Set': 'core-js/es6/set'
  })
];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
}

var config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'playerjs-iframe.js',
    library: 'playerjsIframe',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test')
        ],
        query: {
          presets: ['es2015'],
          plugins: [
            'babel-plugin-add-module-exports',
            'transform-class-properties',
            'transform-es2015-classes',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
