import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'

Vue.use(Vuex)
Vue.use(Router)

const router = new Router(routerConfig)
const store = new Vuex.Store(storeConfig)

Vue.config.productionTip = false

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
