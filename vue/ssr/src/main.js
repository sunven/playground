import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'

Vue.config.productionTip = false

// 全局混入，beforeMount,服务端不会触发，只会在客户端执行

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options
    asyncData && asyncData({ store: this.$store, route: this.$route })
  },
})

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
