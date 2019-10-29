const path = require('path');
const ROOT_PATH = path.join(__dirname, '../');

let libraryName = 'simple-react-select';

commonConfig = {
  entry: {
    app: ['@babel/polyfill', path.join(ROOT_PATH, 'src/index.js')],
  },
  output: {
    path: path.join(ROOT_PATH, './lib'),
    publicPath: '/',
    filename: libraryName + '.js',
    chunkFilename: '[name].[chunkhash].js',
    libraryTarget: 'umd',
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
