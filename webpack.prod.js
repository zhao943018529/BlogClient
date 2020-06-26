const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    // webpack has the ability to generate path info in the output bundle
    pathinfo: false,
    filename: '[name].[chunkhash:6].js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        sideEffects: true,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '/css', esModule: true, hmr: false },
          },
          {
            loader: 'css-loader',
            options: { modules: false, importLoaders: 1 },
          },
          {
            loader: 'sass-loader',
            options: {},
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // long term caching
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
});
