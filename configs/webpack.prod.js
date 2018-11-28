const path = require('path')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const webpackConfig = require('../configs/webpack.base')

module.exports = merge(webpackConfig, {
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: './'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash:7].css'
    })
  ]
})
