'use strict'

// Silence webpack2 deprecation warnings
// https://github.com/vuejs/vue-loader/issues/666
process.noDeprecation = true

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const webpack = require('webpack')

// Paths to be used for webpack configuration
const paths = {
  appSrc: path.join(process.cwd(), 'src'),
  appIndex: path.join(process.cwd(), 'src', 'index.js'),
  appBuild: path.join(process.cwd(), 'release'),
  public: '/'
}

module.exports = {
  mode: 'production',
  entry: {
    main: [
      // Your app's code
      paths.appIndex
    ]
  },
  output: {
    // This is the productin JS bundle containing code from all our entry points.
    filename: 'bundle.[chunkhash:8].js',
    // The output path where webpack will write the bundle
    path: paths.appBuild
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        // We use babel-loader to transipile every .js or .jsx file
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // Including over excluding as a whitelist is easier to maintain than a blacklist.
        // as per http://stackoverflow.com/questions/31675025/how-to-exclude-nested-node-module-folders-from-a-loader-in-webpack
        include: paths.appSrc
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, 'postcss-loader']
        })
      },
      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: 'file-loader?limit=8192'
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new ProgressBarPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      title: 'Hexo Encore',
      template: path.resolve(__dirname, './index.html'),
      inject: true,
      favicon: path.resolve(__dirname, '../public/favicon.png'),
      hash: true
    }),
    new ExtractTextPlugin('styles.[contenthash:8].css'),
    // To be used for JSX support
    new webpack.ProvidePlugin({
      Snabbdom: 'snabbdom-pragma'
    })
  ],
  devtool: 'cheap-module-source-map'
}
