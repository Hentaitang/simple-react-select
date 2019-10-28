const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.join(__dirname, '../')

commonConfig = {
  entry: {
    app: ['@babel/polyfill', path.join(ROOT_PATH, 'src/index.js')],
  },
  output: {
    path: path.join(ROOT_PATH, './dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'index.html',
      template: path.join(ROOT_PATH, 'src/index.html'),
    }),
  ],
  resolve: {
    alias: {
      router: path.join(ROOT_PATH, 'src/router'),
      components: path.join(ROOT_PATH, 'src/components'),
      pages: path.join(ROOT_PATH, 'src/pages'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = commonConfig;
