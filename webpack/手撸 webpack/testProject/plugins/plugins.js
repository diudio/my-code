class EntryOptionPlugin {
    apply(compiler) {
        compiler.hooks.entryOption.tap('EntryOptionPlugin', function () {
            console.log('EntryOptionPlugin')
        })
    }
}
class AfterPlugin {
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('AfterPlugin', function () {
            console.log('AfterPlugin')
        })
    }
}
class RunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('RunPlugin', function () {
            console.log('RunPlugin')
        })
    }
}
class CompilePlugin {
    apply(compiler) {
        compiler.hooks.compile.tap('CompilePlugin', function () {
            console.log('CompilePlugin')
        })
    }
}
class AfterCompilePlugin {
    apply(compiler) {
        compiler.hooks.afterCompile.tap('AfterCompilePlugin', function () {
            console.log('AfterCompilePlugin')
        })
    }
}
class EmitPlugin {
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function () {
            console.log('emit')
        })
    }
}
class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', function () {
            console.log('DonePlugin')
        })
    }
}

module.exports = {
    EntryOptionPlugin,
    AfterPlugin,
    RunPlugin,
    CompilePlugin,
    AfterCompilePlugin,
    EmitPlugin,
    DonePlugin
}
