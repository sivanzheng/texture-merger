const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

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
  plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, './test/index.html'),
		})
	],
  devServer: {
    contentBase: './dist',
    publicPath: path.resolve(__dirname, '/dist/'),
    port: 3333,
  }
};