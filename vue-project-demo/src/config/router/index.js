export default function(router) {
  router.beforeEach((to, from, next) => {
    next()
  })
  router.afterEach((to, from) => {
    console.log('route from: ', from)
    console.log('route to: ', to)
  })
}