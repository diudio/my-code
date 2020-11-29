const path = require('path')
const {    
    EntryOptionPlugin,
    AfterPlugin,
    RunPlugin,
    CompilePlugin,
    AfterCompilePlugin,
    EmitPlugin,
    DonePlugin
} = require('./plugins/plugins')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use:[{
                loader: 'replace-loader',
                options: {
                    name: 'monica'
                }
            }]
        }]
    },
    // 设置加载 loader 的目录
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    plugins: [
        new EntryOptionPlugin(),
        new AfterPlugin(),
        new RunPlugin(),
        new CompilePlugin(),
        new AfterCompilePlugin(),
        new EmitPlugin(),
        new DonePlugin()
    ]
}
