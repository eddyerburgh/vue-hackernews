import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
import ProgressBar from './components/ProgressBar'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'
import { titleMixin } from './util/mixins'
import {
  timeAgo,
  host
} from './util/filters'

Vue.use(Vuex)
Vue.use(Router)

const router = new Router(routerConfig)
const store = new Vuex.Store(storeConfig)

sync(store, router)

Vue.mixin(titleMixin)
Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)

Vue.config.productionTip = false

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
