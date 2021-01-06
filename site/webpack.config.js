/* eslint import/no-extraneous-dependencies: ["off"] */

const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const port  =3000;
new WebpackDevServer(webpack({
    devtool: 'source-map',
    entry: [
      `webpack-dev-server/client?http://localhost:${port}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      '../site/index'

    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,

          exclude: /node_modules/,
          // loader: 'babel-loader',
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
          include: [
            path.resolve(__dirname, '../site'),
            path.resolve(__dirname, '../src'),
            path.resolve(__dirname, '../libs')
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
    // contentBase: path.join(__dirname, 'site'),
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    stats: {colors: true}
  }).listen(port, 'localhost', error => {
  if (error) {
    throw error;
  }
});
