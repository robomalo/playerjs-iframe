var webpack = require("webpack");
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require("path");
var env = require("yargs").argv.mode;
var pkg = require("./package.json");

var plugins = [];

if (env === "build") {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
}

var config = {
  entry: path.join(__dirname, "lib", "index.js"),
  //devtool: "source-map",
  output: {
    path: path.join(__dirname, "dist"),
    filename: pkg.name + ".js",
    library: pkg.name,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve("./lib"),
    extensions: ["", ".js"]
  },
  plugins: plugins
};

module.exports = config;
