import Vue from 'vue'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

const { app, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// actually mount to DOM
app.$mount('#app')
