// 深拷贝，未解决循环依赖问题
function deepClone1 (param) {
    if (param && typeof param === 'object') {
        const objClone = Array.isArray(param) ? [] : {}
        for (let key in param) {
            if (param.hasOwnProperty(key)) {
                objClone[key] = deepClone1(param[key])
            }
        }
        return objClone
    } else {
        return param
    }
}

// 深拷贝，用 Map 解决循环引用问题
/*
 * 如下这样会出现循环引用, 用上面的方法会无限深度遍历，栈溢出
 * const obj = { name: 'zwj' }
 * obj.circle = obj
 */
function deepClone2(objComplex, mapx = new Map()) {
    if (!objComplex || typeof objComplex !== 'object') {
        return objComplex
    }

    if (mapx.get(objComplex)) {
        return mapx.get(objComplex)
    }
    const objClone = Array.isArray(objComplex) ? [] : {}
    mapx.set(objComplex, objClone)
    for (let key in objComplex) {
        if (objComplex.hasOwnProperty(key)) {
            objClone[key] = deepClone2(objComplex[key], mapx)
        }
    }
    return objClone
}


// test


var objComplex = {
    name: 'woow_wu7',
    address: {
      city: 'chongqing',
      district: 'yubei',
      town: 'jiazhou',
      detail: ['chongqing', 'yubei', 'jiazhou']
    },
    score: [100, 200]
}

var res = deepClone2(objComplex)
console.log(res, 'res')