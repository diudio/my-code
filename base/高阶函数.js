// https://juejin.cn/post/6892886272377880583

// 组合函数的实现
function compose(...funcs) {
    return function (args) {
        return funcs.reduce((cmps, fn) => fn(cmps), args)
    }
}

// test
function trim(input) {
    console.log('trim')
    return typeof input === "string" ? input.trim() : input;
}

function lowerCase(input) {
    console.log('lowerCase')
    return input && typeof input === "string" ? input.toLowerCase() : input;
}

function split(input, delimiter = ",") {
    console.log('split')
    return typeof input === "string" ? input.split(delimiter) : input;
}

var trimLowerCaseAndSplit = compose(trim, lowerCase, split);
trimLowerCaseAndSplit(" a,B,C ");
/* 打印如下
 * trim
 * lowerCase
 * split
 * ["a", "b", "c"]
 */




// compose 实现洋葱模型
function compose(middleware) {
    return function () {
        let index = -1
        return dispatch(0)
        function dispatch(i) {
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'))
            }
            index = i
            let fn = middleware[i]
            if (!fn) return Promise.resolve()
            try {
                return Promise.resolve(fn(dispatch.bind(null, i + 1)))
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

// test, 不能处理异步的洋葱模型
function a(next) {
    console.log(1)
    next()
    console.log(4)
}
async function b(next) {
    console.log(2)
    next()
    console.log(5)
}
function c(next) {
    console.log(3)
    next()
    console.log(6)
}
compose([a, b, c])()














