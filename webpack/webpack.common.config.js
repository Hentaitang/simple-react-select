const path = require('path');
const ROOT_PATH = path.join(__dirname, '../');

let libraryName = 'simple-react-select';

commonConfig = {
  entry: {
    app: path.join(ROOT_PATH, 'src/index.js'),
  },
  output: {
    path: path.join(ROOT_PATH, './lib'),
    publicPath: '/',
    filename: libraryName + '.js',
    chunkFilename: '[name].vendor.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
        },
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'url-loader?limit=1000000',
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
