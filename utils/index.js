/*
 * 用于自动生成路由
 * 用法实例 const router = createRouter(require.context('@/containers/moduleName', true, /\.vue$/))
 */
const createRouter = (files) => {
    function formatRouter (files) {
        let routers = []
        files.keys().forEach(originPath => {
            let path = originPath.slice(1).replace(/\/index\.vue$|\.vue$/, "")
            let name = path.slice(1).replace(/\/(\w)/g, ($, $1) => $1.toUpperCase())
            routers.push({
                name,
                path,
                component: () => files(originPath).default
            })
        })
        return routers
    }
    let routers = formatRouter(files)
    return new routers({
        routers
    })
}
