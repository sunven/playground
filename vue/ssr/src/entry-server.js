import { createApp } from './main'

// 首屏渲染
// 创建Vue实例
// renderer调用
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 跳转至首屏
    router.push(context.url)

    // 监听ready，确保异步任务都完成
    router.onReady(() => {
      //处理异步请求
      // 获取当前匹配的组件
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      const tasks = matchedComponents.map(comp => {
        return (
          comp.asyncData &&
          comp.asyncData({ store, route: router.currentRoute })
        )
      })
      Promise.all(tasks).then(() => {
        //前端：window.__INITIAL_STATE__
        context.state = store.state
        resolve(app)
      })
    }, reject)
  })
}
