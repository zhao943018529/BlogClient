const path = require('path');
const webpack = require('webpack');
// const MiniCssExtractLoader = require('mini-css-extract-plugin');
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
    filename: 'js/[name].[hash:6].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
      '@controls': path.resolve(__dirname, './src/controls'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        // exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'thread-loader',
          { loader: 'babel-loader', options: { cacheDirectory: true } },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:7].[ext]',
              outputPath: 'images/',
              limit: 4 * 1024,
            },
          },
          // TODO: 目前在window上会出错
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     // 压缩 jpeg 的配置
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 65,
          //     },
          //     // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
          //     optipng: {
          //       enabled: false,
          //     },
          //     // 使用 imagemin-pngquant 压缩 png
          //     pngquant: {
          //       quality: [0.65, 0.8],
          //       speed: 4,
          //     },
          //     // 压缩 gif 的配置
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
          //     webp: {
          //       quality: 75,
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        // exclude: /node_modules/,
        // include: [],
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'styles',
        },
      },
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
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
    moduleIds: 'hashed',
    sideEffects: false,
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          minChunks: 2,
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
        },
        materialUI: {
          minChunks: 2,
          test: /[\\/]node_modules[\\/]@material-ui(.*)/,
          priority: 5,
        },
        common: {
          minChunks: 2, //覆盖外层的全局属性
          priority: -20,
          reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
        },
      },
    },
  },
};
