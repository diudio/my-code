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



// 柯里化的实现1， 缺点：必须参数传够了才能执行
function curry(func) {
    return function curried(...args) {
        if (args.length >= func.length) { // 通过函数的length属性，来获取函数的形参个数
            return func.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    }
}
// 科里化实现2，  缺点：必须手动执行
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


// 偏函数的实现
function partial(fn) {
    let args = [].slice.call(arguments, 1);
    return function () {
        const newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
}



// 惰性函数 实现1  函数覆盖的方式实现  第一次使用时判断
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}

// 惰性函数 实现2   立即执行函数，定义时即判断，这点不如方法1
function addHandler(element, type, handler) {
    if (element.addEventListener) {
        addHandler = function (element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addHandler = function (element, type, handler) {
            element.attachEvent("on" + type, handler);
        };
    } else {
        addHandler = function (element, type, handler) {
            element["on" + type] = handler;
        };
    }
    return addHandler(element, type, handler);
}



// 缓存函数
function memorize(fn) {
    const cache = Object.create(null); // 存储缓存数据的对象
    return function (...args) {
        const _args = JSON.stringify(args);
        return cache[_args] || (cache[_args] = fn.apply(fn, args));
    };
};

//test
let add = (a, b) => {
    console.log('add')
    return a + b
};

let addMemorize = memorize(add);
addMemorize(666, 888);
addMemorize(666, 888); // 从缓存中获取