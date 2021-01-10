const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = path.resolve(__dirname, '../../');

module.exports = {
  entry: {
    site: path.join(basePath, 'site')
  },
  output: {
    path: path.resolve(basePath, 'dist/site'),
    chunkFilename: '[chunkhash:12].js',
    filename: '[chunkhash:12].js'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[chunkhash:12].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: path.join(basePath, 'site/assets/favicon.ico')
    })
  ].concat(process.env.TRAVIS_CI ? [] : [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          "presets": [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-flow",

          ],
          "plugins": [
            "react-hot-loader/babel",
            [
              "@babel/plugin-transform-runtime",
              {
                "corejs": 2
              }
            ],
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-proposal-json-strings",
            [
              "@babel/plugin-proposal-decorators",
              {
                "legacy": true
              }
            ],
            "@babel/plugin-proposal-function-sent",
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-proposal-numeric-separator",
            "@babel/plugin-proposal-throw-expressions",
            "@babel/plugin-proposal-export-default-from",
            "@babel/plugin-proposal-logical-assignment-operators",
            "@babel/plugin-proposal-optional-chaining",
            [
              "@babel/plugin-proposal-pipeline-operator",
              {
                "proposal": "minimal"
              }
            ],
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-do-expressions"
          ]
        }
      },
      exclude: /node_modules/,

      include: [
        path.join(basePath, 'site'),
        path.join(basePath, 'src'),
        path.join(basePath, 'libs')
      ]
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      loader: 'file-loader?name=[hash:12].[ext]'
    }, {
      test: /\.(jpe?g|png|gif)(\?.+)?$/,
      loader: 'url-loader?name=[hash:12].[ext]&limit=25000'
    }, {
      test: /\.md$/,
      loader: 'raw-loader'
    }]
  },
  mode: 'production'
};
