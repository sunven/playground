const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    info: './src/info.js',
    list: './src/list.js',
    detail: './src/detail.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  mode: 'development',
  plugins: [
    new htmlWebpackPlugin({
      template: './src/assets/html/index.html',
      filename: 'info.html',
      chunks: ['info'],
    }),
    new htmlWebpackPlugin({
      template: './src/assets/html/index.html',
      filename: 'list.html',
      chunks: ['list'],
    }),
    new htmlWebpackPlugin({
      template: './src/assets/html/index.html',
      filename: 'detail.html',
      chunks: ['detail'],
    }),
    new CleanWebpackPlugin(),
  ],
}
