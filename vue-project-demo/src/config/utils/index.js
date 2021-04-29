/*
 * 用于自动生成路由
 * 用法实例 const router = createRouter(require.context('@/containers/moduleName', true, /\.vue$/))
 */
const createRouter = (files) => {
  let routers = []
  files.keys().forEach(originPath => {
    let path = originPath.slice(1).replace(/\/index\.vue$|\.vue$/, "")
    let name = path.slice(1).replace(/\/(\w)/g, ($, $1) => $1.toUpperCase())
    if (!path.includes("components") && !path.includes("mixin")) {
      routers.push({
        name,
        path,
        component: r => require.ensure([], () => r(require(`../../containers${path}`)))
        // component: files(originPath).default
        // component: () => import('xxx') 动态路径可用此方式
        // 虽说es6支持import的参数为变量，但是webpack不支持，可将import的参数写成模板字符串的形式
        // 例如import(foo)，这样完全动态的加载方式将会失败，因为webpack需要一些文件位置信息。因为变量foo可能是系统或项目中任何文件的路径。import()必须至少包含关于模块所在位置的一些信息，因此让捆绑可以局限于特定的目录或文件夹
      })
    }
  })
  return routers
}

export {
  createRouter
}