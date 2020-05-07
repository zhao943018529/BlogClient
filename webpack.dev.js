const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    // 让react热更新loader优先加载
    'react-hot-loader/patch',
    path.resolve(__dirname, 'src', 'index.tsx'),
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        sideEffects: true,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false, sourceMap: true, importLoaders: 1 },
          },
        ],
      },
      {
        test: /\.(sa|sc)ss$/,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: { modules: false, sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    port: '9000',
    compress: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9001/',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // 输出目录
  //   filename: '[name].[hash:6].js', // 输出文件名
  //   chunkFilename: '[name].[hash:8].js',
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:6].css',
      chunkFilename: 'css/[name].[hash:8].css',
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
});
