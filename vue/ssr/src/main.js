import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

Vue.config.productionTip = false

export function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App),
  }).$mount('#app')
  return { app, router, store }
}
