/**
 * @description cli配置
 */

const path = require('path')
const settings = require('./src/config')
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development' ? 'error' : false,
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: process.env.port || settings.devPort || '9001',
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '@': resolve('src'),
          '@libs': resolve('libs')
        }
      },
      plugins: [
      ]
    }
  },
  chainWebpack(config) {
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons'))
    //   .end()
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()

    config.when(process.env.NODE_ENV === 'development', (config) => {
      config.devtool('source-map');
    });
    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.performance.set('hints', false)
      config.devtool('none')
      config.optimization.splitChunks({
        automaticNameDelimiter: '-',
        chunks: 'all',
        cacheGroups: {
          chunk: {
            name: 'lit-chunk',
            test: /[\\/]node_modules[\\/]/,
            minSize: 131072,
            maxSize: 524288,
            chunks: 'async',
            minChunks: 2,
            priority: 10
          },
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/](vue(.*)|core-js)[\\/]/,
            chunks: 'initial',
            priority: 20
          },
          litUI: {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui(.*)[\\/]/,
            priority: 30
          }
        }
      })
    })
  },
  runtimeCompiler: true,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        }
      }
    }
  }
}
