var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
require('es6-promise').polyfill();

var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

var configFile = 'config.json';

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('[name].css');
var extractLESS = new ExtractTextPlugin('[name].less');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: path.join(__dirname, "src") + "/track.jsx",
  output: {
    path: "./dist",
    filename: "[name].min.js",
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: [
          'babel'
        ],
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }, 
      {
        test: /\.css$/,
        loader: extractCSS.extract(['css'])
      },
      {
        test: /\.less$/,
        loader: extractLESS.extract(['css','less'])
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpeg|gif|mp4)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
    ]
  },
  externals: {
    Config: JSON.stringify(require(__dirname + '/' + configFile))
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: debug ? 
    [
      HTMLWebpackPluginConfig,
      extractCSS,
      extractLESS
    ]: 
    [
      HTMLWebpackPluginConfig,
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      new webpack.DefinePlugin({
        'process.env':{
           'NODE_ENV': JSON.stringify('production')
         }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress:{
          warnings: true
        }
      }),
      extractCSS,
      extractLESS
    ],
};