const loaderUtils = require('loader-utils')
// loader-utils插件
// 可以通过loader-utils中的getOptions拿到loader中的options对象

module.exports = function(source) {
  // source就是该loader匹配的文件的源码
  
    const options = loaderUtils.getOptions(this)
    // 通过 loader-utils的getOptions获取options对象

    const callback = this.async()
    // this.async()用来处理loader中的异步操作, -------- 返回值是：this.callback()
    // this.callback(err, content, sourceMap?, meta?)
    
    setTimeout(function() {
        const result = source.replace('world', options.name)
        callback(null, result)
    }, 1000)
}
