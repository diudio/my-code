/**
 * process.cwd()  当前工作目录
 * fs.readFileSync(path[, options])  读文件
 * path.relative(from, to)  from 到 to 的相对路径
 * path.dirname(path)  最后一段的父目录的绝对路径
 * path.extname(path)  返回 path 的扩展名
 */

const fs = require('fs')
const path = require('path')
// string -> AST
const babelParser = require('@babel/parser')
// 增删改 AST
const babelTypes = require('@babel/types')
// 遍历 AST, 同时提供钩子,
const babelTraverse = require('@babel/traverse').default
// AST -> string
const babelGenerator = require('@babel/generator').default
const ejs = require('ejs')
const { SyncHook } = require('tapable')

class Compiler{
    constructor(config) {
        this.config = config
        this.entryId = null
        this.modules = {}
        this.entry = config.entry.index
        this.root = process.pwd()
        this.hooks = {
            entryOption: new SyncHook(),
            afterPlugins: new SyncHook(),
            run: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
        const plugins = this.config.plugins
        if (Array.isArray(plugins)) {
            plugins.forEach(plugin => {
                plugin.apply(this) // this 是 compiler 实例
            })
        }
        this.hooks.afterPlugins.call()
    }
    
    // 返回被 loader 处理后的源码
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, { encoding: 'utf8' })
        const { rules } = this.config.module
        for (let i = 0; i < rules.length; i++) {
            const { test, use } = rules[i]
            let reverseIndex = use.length - 1
            if (test.test(modulePath)) {
                runLoader()
                function runLoader() {
                    const loader = require(use[reverseIndex--])
                    content = loader(content)
                    if (reverseIndex >= 0) {
                        runLoader()
                    }
                }
            }
        }
        return content
    }

    // 构建模块代码的 key: value 映射
    // 构建依赖数组
    buildModule (moduleAbsolutePath, isEntry) {
        const source = this.getSource(moduleAbsolutePath)
        const moduleRelativePath = './' + path.relative(this.root, moduleAbsolutePath)
    
        if (isEntry) {
            this.entryId = moduleRelativePath
        }
    
        const fatherPath = path.dirname(moduleRelativePath)
    
        // 参数： 改造前的源码，父路径
        // 返回值： 改造后的源码，依赖列表
        const { sourceCode, dependencies } = this.parse(source, fatherPath)
    
        this.modules[moduleRelativePath] = sourceCode
    
        dependencies.forEach(dep => {
            this.buildModule(path.join(this.root, dep), false)
        });
    }

    // 源码 -> AST -> 改造后的源码
    // 输出源码和依赖列表
    parse(source, parentPath) {
        const dependencies = []
        const AST = babelParser.parse(source)
        babelTraverse(AST, {
            CallExpression(p) {
                const node = p.node
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__'
                    let modulePath = node.arguments[0].value
                    modulePath = "./" + path.join(parentPath, modulePath).replace(/\\/g, '/') + (path.extname(modulePath) ? '' : '.js')
                    dependencies.push(modulePath)
                    node.arguments = [babelTypes.stringLiteral(modulePath)]
                }
            }
        })
        const sourceCode = babelGenerator(AST).code
        return {sourceCode, dependencies}
    }

    // 将代码输出到文件
    emitFile() {
        const {path: p, filename} = this.config.output
        const main = path.join(p, filename)
        const templeteSourceStr = this.getSource(path.join(__dirname, 'main.ejs'))

        const code = ejs.render(templeteSourceStr, {
            entryId: this.entryId,
            modules: this.modules
        })

        this.assets = {}
        this.assets[main] = code

        fs.writeFileSync(main, this.assets[main])
    }

    run () {
        this.hooks.run.call()
        this.hooks.compile.call()
        this.buildModule(path.resolve(this.root, this.entry), true)
        this.hooks.afterCompile.call()
        this.emitFile()
        this.hooks.emit.call()
        this.hooks.done.call()
    }
}

module.exports = Compiler
