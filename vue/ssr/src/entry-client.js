import { createApp } from './main'

// 客户端激活
// 创建Vue实例
const { app, router, store } = createApp()

//恢复state

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
