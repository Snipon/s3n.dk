const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const src = path.resolve(__dirname, 'private', 'src');

module.exports = {
  entry: path.resolve(src, 'ts', 'index.ts'),
  resolve: {
    extensions: ['.css', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
  },

  plugins: [
    new UglifyJSPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(src, 'img', 'favicon.png'),
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
    new HtmlWebpackPlugin({
      title: 'Simon Larsson',
      meta: {
        viewport: 'width=device-width,initial-scale=1',
        description:
          'My name is Simon Larsson. I am a web developer from Sweden who lives in Denmark.',
      },
    }),
  ],
};
