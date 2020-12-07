// call  es6 实现
Function.prototype.myCall = function (context = window, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('type must be function')
    }
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
}


// call  es5 实现, 利用科里化收集参数
Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('type must be function')
    }
    context = context || window
    context.fn = this
    var args = forMatArguments(arguments)
    console.log(args)
    var curryFn = curry(context.fn)
    delete context.fn
    args.forEach(item => {
        curryFn(item)
    })
    return curryFn.run()
}

// 将 arguments 转换为数组
function forMatArguments (obj) {
    var res = []
    for (key in obj) {
        // 第一个参数是context, 不push
        if (key * 1 && obj.hasOwnProperty(key)) {
            res.push(obj[key])
        }
    }
    return res
}

// 用科里化收集参数 代替解构
function curry (fn) {
    let args = []
    function curried (...args2) {
        args = [...args, ...args2]
        return curried
    }
    curried.run = function () {
        fn.apply(this, args)
    }
    return curried
}

// test
console.log(Array.prototype.slice.call({0: 10, 1: 20, 2: 30, length: 3}, 1))
console.log(Array.prototype.slice.myCall({0: 10, 1: 20, 2: 30, length: 3}, 1))
