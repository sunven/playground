//引用vue构造函数，Router中会使用
import view from './view'
import link from './link'
let Vue

class Router {
  constructor(options) {
    this.$options = options

    //用于保存当前url
    this.current = '/'

    //matched为响应式，为了变化是渲染组件
    Vue.util.defineReactive(this, 'matched', [])
    //获得当前hash
    this.onHashChange()

    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  onHashChange() {
    // #/foo
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.match()
  }

  match(routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children && route.children.length > 0) {
          this.match(route.children)
        }
        return
      }
    }
  }
}

Router.install = function(_Vue) {
  Vue = _Vue

  //为了拿到vue实例，利用mixin
  Vue.mixin({
    beforeCreate() {
      //此时的this，就是vue实例
      if (this.$options.router) {
        //所有组件都会执行beforeCreate
        //确保是根实例
        Vue.prototype.$router = this.$options.router
      }
    },
  })

  Vue.component('router-view', view)

  Vue.component('router-link', link)
}

export default Router
