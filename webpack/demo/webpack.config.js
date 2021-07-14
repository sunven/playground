const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
  },
  mode: 'development',
  resolveLoader: { modules: ['./node_modules', './loaders'] },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/assets/html/index.html',
      filename: 'assets/html/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
}
