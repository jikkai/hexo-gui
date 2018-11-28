const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const webpackConfig = require('../configs/webpack.base')

module.exports = merge(webpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    port: 7777,
    historyApiFallback: true,
    lazy: false,
    host: '0.0.0.0',
    disableHostCheck: true,
    quiet: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:7777']
      }
    })
  ]
})
