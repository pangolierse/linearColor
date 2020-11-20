### 路径别名
vuecli4中配置webpack
在vue.config.js中
const path = require('path')
const resolve = dir => path.join(__dirname,dir)
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
    .set('@', resolve('src'))
    .set('@assets', resolve('src/assets'))
    .set('@components', resolve('src/components'))
    .set('@views', resolve('src/views'))
    .set('@store', resolve('src/store'));
    
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
### 定义less全局变量
npm style-resources-loader
并添加
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pluginOptions: { // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/styles/variables.less')] // less所在文件路径
    }
  }
 }
注意：如果发现页面引入一直报错，说找不到、不存在或者定义无效等错误，那么还需要安装依赖：
npm install --dev vue-cli-plugin-style-resources-loader
其实，正常情况下载安装依赖style-resources-loader时，会同时安装vue-cli-plugin-style-resources-loader，可能有其它不确定原因导致vue-cli-plugin-style-resources-loader安装失败，出错的话就需要手动安装了。
安装完成，重启服务即可。
### 组件挂载问题
只有当子组件均加载完毕，挂载完成，父组件才会开始挂载，所以如果在此时，子组件触发事件总线，父组件将无法即使处理此次事件会造成事件丢失
### 焦点事件和点击事件
焦点事件发生于点击事件， 此次场景是：绑定色盘按钮，按钮点击后显现色盘，失去焦点时色盘消失，因为色盘内部input
会改变焦点对象，所以采用定位方式来判断是否失去焦点，得到焦点的时候给documentElement绑定click事件，当点击事件
位于色盘外则隐藏色盘，并清空click事件，但由于焦点事件先于点击事件，出现绑定完click事件马上就触发了click事件并
传入了event值，此时event方位在按钮内部，不在色盘内部，所以导致色盘显示不出来
解决方法： 通过定时器setTimeOut(function , 0) 对绑定事件进行异步绑定，即可躲避初始click判定
### watch immediate 
开启之后会在变量被创建之后立刻调用此时是没办法获得dom元素的