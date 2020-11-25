// 防抖函数 基础版
function debounce (func, wait = 50) {
    let timer = null
    return function (...args) {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

// 节流函数 基础
function throttle (func, wait = 50) {
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

/**
 * 防抖函数 升级版，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
function debounce (func, wait = 50, immediate = true) {
    let timer = null
    return function (...args) {
        // 清除现有的计时器
        timer && clearTimeout(timer)
        if (immediate) {
            // 不存在计时器，直接执行
            if (!timer) {
                func.apply(this, args)
            }
            // 重新挂载计时器，只为控制计时周期来防抖，结束后不执行
            timer = setTimeout(() => {
                timer = null
            }, wait)
        } else {
            // 重新挂载计时器，结束后执行被防抖的函数
            timer = setTimeout(() => {
                timer = null
                func.apply(this, args)
            }, wait)
        }
    }
}

/**
 * underscore 节流函数 升级版，返回函数连续调用时，func 执行频率限定为 次 / wait
 * 实现关键点在于控制上一时间与当前时间，用两者相减值来控制是立即执行还是延时执行还是直接返回
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
function throttle (func, wait = 50, options = {}) {
    let result
    let timer
    // 计算当前周期剩余时间，用于设置定时器和控制函数立即执行还是延时执行
    let preTimeStamp = 0 

    return function (...args) {
        let nowTimeStamp = Date.now()
        // 控制图中情况3，延时执行
        if (options.leading === false) preTimeStamp = nowTimeStamp;
        // 计算定时器剩余时间
        let remaining = wait - (nowTimeStamp - preTimeStamp);
        // 对应图中情况12，立即执行
        if (remaining <= 0) {
            preTimeStamp = nowTimeStamp;
            timer = null
            result = func.apply(this, args);
        // 对应图中情况13，延时执行
        } else if (!timer && options.trailing !== false) {
            timer = setTimeout(() => {
                timer = null
                preTimeStamp = options.leading === false ? 0 : Date.now()
                result = func.apply(this, args)
            }, remaining);
        }
        // 返回执行结果或者上一次的执行结果
        // 若已有定时器，则跳过流程，直接返回结果
        return result
    }
}


// test
var timeStamp = Date.now()
function testFn () {
    console.log(Date.now() - timeStamp)
}

debounceTestFn = debounce(testFn, 1000)
// debounceTestFn = debounce(testFn, 1000, false)
// throttleTestFn = throttle(testFn, 1000)
// throttleTestFn = throttle(testFn, 1000, {leading: false})
throttleTestFn = throttle(testFn, 1000, {trailing: false})

// test
function doTest () {
    // setTimeout(() => {
    //     debounceTestFn()
    //     throttleTestFn()
    //     doTest()
    // }, Math.random() * 1000 + 500)

    // debounceTestFn()
    // setTimeout(debounceTestFn, 800)
    // setTimeout(debounceTestFn, 1200)
    // setTimeout(debounceTestFn, 2300)
    // setTimeout(debounceTestFn, 2500)

    setTimeout(throttleTestFn, 100)
    setTimeout(throttleTestFn, 800)
    setTimeout(throttleTestFn, 1200)
    setTimeout(throttleTestFn, 2300)
    setTimeout(throttleTestFn, 4500)
}

doTest()


