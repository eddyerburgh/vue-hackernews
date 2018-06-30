import Vue from 'vue'
import {
  titleMixin
} from './src/util/mixins'
import {
  timeAgo,
  host
} from './src/util/filters'

Vue.config.productionTip = false // #A

Vue.mixin(titleMixin) // #B
Vue.filter('timeAgo', timeAgo)
Vue.filter('host', host)
