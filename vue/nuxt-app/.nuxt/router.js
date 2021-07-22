import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _085ca42e = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _1a3bf327 = () => interopDefault(import('../pages/detail.vue' /* webpackChunkName: "pages/detail" */))
const _79f05552 = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _550cc740 = () => interopDefault(import('../pages/foo.vue' /* webpackChunkName: "pages/foo" */))
const _d7ec05fa = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _6b3b4c28 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _085ca42e,
    name: "admin"
  }, {
    path: "/detail",
    component: _1a3bf327,
    name: "detail",
    children: [{
      path: ":id?",
      component: _79f05552,
      name: "detail-id"
    }]
  }, {
    path: "/foo",
    component: _550cc740,
    name: "foo"
  }, {
    path: "/login",
    component: _d7ec05fa,
    name: "login"
  }, {
    path: "/",
    component: _6b3b4c28,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
