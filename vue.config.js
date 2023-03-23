const { defineConfig } = require('@vue/cli-service')
const CompressionPlugin = require('compression-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const IS_PROD = process.env.NODE_ENV === 'production'
const port = process.env.port || process.env.npm_config_port || 8080
module.exports = defineConfig({
  publicPath: process.env.VUE_PUBLIC_DIR,
  outputDir: 'build', // 打包生成目录
  assetsDir: 'static', // 静态资源目录
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: port, // 代理端口
    https: false,
    open: false, // 浏览器自动打开页面
    hot: 'only',
    client: {
      progress: true,
      overlay: { errors: true, warnings: false },
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: '',
        },
      },
    },
  },
  configureWebpack: (config) => {
    config.resolve = {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['.js', '.vue', '.json'],
    }
    if (IS_PROD) {
      config.mode = 'production'
      config.plugins.push(
        // new UglifyPlugin({
        //   // 删除console
        //   uglifyOptions: {
        //     parallel: true, //开启多线程提高打包速度, 默认并发运行数：os.cpus().length - 1
        //     warnings: false,
        //     compress: {
        //       drop_console: false,
        //       drop_debugger: false,
        //       pure_funcs: ['console.log', 'console.info'],
        //     },
        //     keep_fnames: true,
        //   },
        // }),
        // gzip压缩
        new CompressionPlugin({
          algorithm: 'gzip',
          filename: '[path][base].gz',
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          threshold: 10240, // 超过1k进行压缩
          deleteOriginalAssets: false, // 是否删除源文件
        })
      )
    } else {
      config.mode = 'development'
    }
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    config.when(IS_PROD, (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          vantUI: {
            name: 'chunk-vantUI', // 单独将 vantUI 拆包
            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
            test: /[\\/]node_modules[\\/]_?vant(.*)/,
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      config.optimization.runtimeChunk('single')
    })
  },
})
