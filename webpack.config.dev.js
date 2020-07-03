const path = require('path');

module.exports = {
  entry: './test/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  devServer: {
    contentBase: './test',
    publicPath: path.resolve(__dirname, '/dist/'),
    port: 3333,
  }
};