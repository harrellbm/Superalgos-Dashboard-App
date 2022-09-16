const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');


module.exports = {
  entry: './Dashboards/UI/vueComponentsSource/main.js',
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './Dashboards/UI/vueComponentsSource/index.html',
      publicPath: '/'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
      })
  ],
  output: {
    clean: true,
    path: path.resolve(__dirname, 'Dashboards/UI/vueComponentsBuilt/'),
    filename: 'bundle.js',
  },
  devServer: {
  }
};