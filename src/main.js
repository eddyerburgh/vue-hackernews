import Vue from 'vue'
import App from './App'
import { fetchListData } from './api/api'

Vue.config.productionTip = false

function getTopItems () {
  return fetchListData('top')
    .then(items => items)
}

getTopItems().then((items) => {
  window.items = items
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})
