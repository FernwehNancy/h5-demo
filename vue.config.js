const path = require('path')
const fs = require('fs')

module.exports = {
  pages: {
    index: {
      entry: 'client/main.js'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // @/ 是 src/ 的别名
        data: fs.readFileSync(path.resolve(__dirname, './client/common/styles/variables.scss'), 'utf-8') // 公共变量文件注入
      }
    }
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve('client'))
    config.module
      .rule('js')
      .include.add(/engine-template/).end()
      .include.add(/client/).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }
}
