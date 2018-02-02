/*
    ./webpack.config.js
*/
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('../static/dist'),
    filename: 'bundle.js',
    publicPath: '/static/dist/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, exclude: /node_modules/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', query: {
                      modules: true,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
              },
              'postcss-loader'
          ]
        }),
      }, 
      { test: /\.scss$/, exclude: /node_modules/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', query: {
                      modules: true,
                      sourceMap: true,
                      importLoaders: 2,
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
              },
              'sass-loader'
          ]
        }),
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, extractPlugin]
}
