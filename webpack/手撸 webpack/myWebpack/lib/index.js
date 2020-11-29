const path = require('path')
const config = require(path.resolve('webpack.config.js')) // 获取webpack.config.js
const Compiler = require('./compiler.js')

const compiler = new Compiler(config)

compiler.run()
