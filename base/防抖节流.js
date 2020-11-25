// 防抖函数 基础版
function debounce (func, wait = 50, immediate = true) {
    let timer = null
    return function (...args) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

// 节流函数 基础
function throttle (func, wait = 50, options) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null
                func.apply(this, args)
            }, wait)
        }
    }
}


// test
var timeStamp = Date.now()
function testFn () {
    console.log(Date.now() - timeStamp)
    timeStamp = Date.now()
}

function doTest () {
    setTimeout(() => {
        debounceTestFn()
        doTest()
    }, Math.random() * 800)
}

debounceTestFn = throttle(testFn, 1000)

doTest()


