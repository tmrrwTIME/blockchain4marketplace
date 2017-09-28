const path = require('path');
const webpack = require('webpack');

const webpackConfig = {
  entry: [path.resolve(__dirname, 'public/js/app.js')],
  output: {
    path: path.resolve(__dirname, 'public/build/js'),
    filename: 'app-bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-async-to-generator']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
};

webpackConfig.plugins = [];
webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
}));


module.exports = webpackConfig;
