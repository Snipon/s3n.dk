const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(__dirname, 'private', 'src', 'app', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      views: path.resolve(__dirname, 'private', 'src', 'app', 'modules', 'views'),
      components: path.resolve(__dirname, 'private', 'src', 'app', 'modules', 'components'),
      tools: path.resolve(__dirname, 'private', 'src', 'app', 'modules', 'tools'),
      styles: path.resolve(__dirname, 'private', 'src', 'scss'),
      images: path.resolve(__dirname, 'private', 'src', 'img'),
    },
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'private', 'src', 'index.template.ejs'),
      inject: 'body',
      hash: true,
      minify: prod ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html?$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'private', 'src', 'app'),
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !prod,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !prod,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
};
