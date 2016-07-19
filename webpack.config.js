var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    'webpack/hot/only-dev-server',
    './client/index.jsx'
  ],
  output: {
    path:     path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
        include: __dirname
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true
  }
};
