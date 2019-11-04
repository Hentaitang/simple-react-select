const path = require('path');
const commonConfig = require('./webpack.common.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const ROOT_PATH = path.join(__dirname, '../');

const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: ['react-hot-loader/patch', '@babel/polyfill', path.join(ROOT_PATH, 'example/app.js')],
  },
  output: {
    filename: '[name].[hash].js',
  },
  devServer: {
    contentBase: path.join(ROOT_PATH, 'dist'),
    port: 8080,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
    open: true,
    clientLogLevel: 'none',
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'index.html',
      template: path.join(ROOT_PATH, 'example/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  },
})(commonConfig, devConfig);
