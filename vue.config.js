const path = require('path')
const resolve = dir => path.join(__dirname,dir)
module.exports = {
  publicPath: "./",
  assetsDir: "assets",
  outputDir: "dist",

  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@assets', resolve('src/assets'))
    .set('@common', resolve('src/common'))
    .set('@components', resolve('src/components'))
    .set('@views', resolve('src/views'))
    .set('@store', resolve('src/store'));
    
  },
  pluginOptions: { // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        resolve('src/assets/styles/less/variables.less'),
        resolve('src/assets/styles/less/theme.less'),
      ] // less所在文件路径
    }
  },
}
