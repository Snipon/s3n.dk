const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');1
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const src = path.resolve(__dirname, 'private', 'src');

module.exports = {
	entry: path.resolve(src, 'ts', 'index.ts'),
	resolve: {
		alias: {
			Styles: path.resolve(src, 'css'),
			Modules: path.resolve(src, 'ts', 'modules')
		},
		extensions: ['.css', '.ts', '.js']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					'postcss-loader'
				]
			}
		]
	},
  devServer: {
		port: 3000
  },

	plugins: [
		new UglifyJSPlugin(),
		//new FaviconsWebpackPlugin(path.resolve(src, 'img', 'favicon.png')),
		new HtmlWebpackPlugin({
			title: 'Simon Larsson'
		})
	]
};
