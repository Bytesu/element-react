/* eslint import/no-extraneous-dependencies: ["off"] */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');


new WebpackDevServer(webpack({
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './site/index'

    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash].js'
    },
    optimization: {
      runtimeChunk: 'single',
      moduleIds: 'deterministic',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // new HtmlWebpackPlugin({
      //   title: 'Output Management',
      //   title: 'Development',
      // }),

    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,

          exclude: /node_modules/,
          loader: 'babel-loader',
          include: [
            path.resolve(__dirname, './site'),
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, './libs')
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
          loader: 'file-loader'
        },
        {
          test: /\.(jpe?g|png|gif)(\?.+)?$/,
          loader: 'url-loader'
        },
        {
          test: /\.md$/,
          loader: 'raw-loader'
        }
      ]
    },
    mode: 'development'
  }),
  {
    contentBase: path.join(__dirname, 'site'),
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    stats: {colors: true}
  }).listen(9000, 'localhost', error => {
  if (error) {
    throw error;
  }
});
