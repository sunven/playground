import Vue from 'vue'
import { createApp } from './main'
import ProgressBar from '@/components/ProgressBar.vue'

const bar = (Vue.prototype.$bar = new Vue(ProgressBar).$mount())
document.body.appendChild(bar.$el)

// 全局混入，beforeMount,服务端不会触发，只会在客户端执行

Vue.mixin({
  //重复执行问题
  // beforeMount() {
  //   const { asyncData } = this.$options
  //   asyncData && asyncData({ store: this.$store, route: this.$route })
  // },
  // 组件复用，才调用
  // beforeRouteUpdate(to, from, next) {
  //   console.log(1)
  //   const { asyncData } = this.$options
  //   if (asyncData) {
  //     asyncData({
  //       store: this.$store,
  //       route: to,
  //     })
  //       .then(next)
  //       .catch(next)
  //   } else {
  //     next()
  //   }
  // },
})

// 客户端激活
// 创建Vue实例
const { app, router, store } = createApp()

//恢复state

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c)
    })

    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器 (loading indicator)，就触发
    bar.start()

    Promise.all(
      activated.map(c => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to })
        }
      })
    )
      .then(() => {
        // 停止加载指示器(loading indicator)
        bar.finish()
        next()
      })
      .catch(next)
  })
  app.$mount('#app')
})
