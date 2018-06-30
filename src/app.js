import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import storeConfig from './store/store-config'
import routerConfig from './router/router-config'
import {
  titleMixin,
  HTTPStatusMixin
} from './util/mixins'
import {
  timeAgo,
  host
} from './util/filters'

Vue.mixin(titleMixin)
Vue.mixin(HTTPStatusMixin)

Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  Vue.use(Vuex)
  Vue.use(Router)

  const router = new Router(routerConfig)
  const store = new Vuex.Store(storeConfig)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
