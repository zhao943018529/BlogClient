const path = require('path');
const webpack = require('webpack');
const MiniCssExtractLoader = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const threadLoader = require('thread-loader');

const jsWorkerPool = {
  // options

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
  // 当 require('os').cpus() 是 undefined 时，则为 1
  workers: 2,

  // 闲置时定时删除 worker 进程
  // 默认为 500ms
  // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000,
};

const cssWorkerPool = {
  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 2,
  poolTimeout: 2000,
};

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
// threadLoader.warmup(cssWorkerPool, ['css-loader', 'postcss-loader']);

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          { loader: 'babel-loader', options: { cacheDirectory: true } },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          process.env.NODE_ENV ? 'style-loader' : MiniCssExtractLoader.loader,
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
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:7].[ext]',
            outputPath: 'images/',
            limit: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      minify: {
        removeAttributeQuotes: false, //是否删除属性的双引号
        collapseWhitespace: false, //是否折叠空白
      },
      // hash: true //是否加上hash，默认是 false
    }),
  ],
  // sideEffects: ['*.css', '*.scss'],
  optimization: {
    sideEffects: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
        },
        utils: {
          chunks: 'initial',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },
};
