import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import store from '@/store'
import * as directives from '@/utils/directives'
import * as filters from '@/utils/filters'
import tools from "@/utils/tools"
import routerFn from "@/config/router"
import { createRouter } from './config/utils'

if (process.env.NODE_ENV === "test") {
  require("eruda").init()
}

Vue.use(Router)
const router = createRouter(require.context('@/containers', true, /\.vue$/))
routerFn(router)

Vue.config.productionTip = false
Vue.prototype.$tools = tools

Object.keys(directives).forEach(item => {
  Vue.directive(item, directives[item])
})

Object.keys(filters).forEach(item => {
  Vue.directive(item, filters[item])
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
