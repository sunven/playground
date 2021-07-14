const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TextWebpackPlugin = require('./plugins/text-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  devServer: {
    //contentBase: './build',
    //contentBasePublicPath: '/assets/html/index.html',
    //open: true,
    compress: true,
    port: 9000,
    //hot: true,
    //hotOnly: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9002',
      },
    },
  },
  mode: 'development',
  //devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',
  resolveLoader: { modules: ['./node_modules', './loaders'] },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['styleLoader', 'cssLoader', 'lessLoader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|woff)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/css/[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        loader: 'replace-loader.js',
        options: {
          name: 'seven',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/assets/html/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new TextWebpackPlugin({
      name: 'twp',
    }),
  ],
}
