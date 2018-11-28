const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['@babel/polyfill', './src/index.jsx'],
  resolve: {
    extensions: ['.jsx', '.js', '.scss', '.json', '.md'],
    alias: {
      '~': path.resolve(__dirname, '../src')
    }
  },
  stats: {
    children: false
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.scss$/,
        loader: 'sass-resources-loader',
        options: {
          resources: [
            './src/styles/common/mixins.scss',
            './src/styles/common/var.scss'
          ]
        }
      },
      {
        enforce: 'pre',
        test: /.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.md$/,
        use: ['json-loader', 'yaml-frontmatter-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff2?)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hexo GUI',
      favicon: path.resolve(__dirname, './favicon.png'),
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html'
    })
  ]
}
