import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 通用页面：不需要守卫，可直接访问
export const constRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true, // 导航菜单忽略该项
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    name: 'home',
    meta: {
      title: 'Home', // 导航菜单项标题
      icon: 'qq', // 导航菜单项图标
    },
  },
]

// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "home" */ '@/views/About.vue'),
    name: 'about',
    meta: {
      title: 'About',
      icon: 'denglong',
      roles: ['admin', 'editor'],
    },
    children: [
      {
        path: '/foo1',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/components/Foo.vue'),
        name: 'foo1',
        meta: {
          title: 'Foo1',
          icon: 'denglong',
          roles: ['admin', 'editor'],
        },
      },
      {
        path: '/foo2',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/components/Foo.vue'),
        name: 'foo2',
        meta: {
          title: 'Foo2',
          icon: 'denglong',
          roles: ['admin', 'editor'],
        },
      },
    ],
  },
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constRoutes,
})

// 前端组件名和组件映射表
const map = {
  //xx: require('@/views/xx.vue').default // 同步的⽅式
  about: () => import('@/views/About.vue'), // 异步的⽅式
}
// 服务端返回的asyncRoutes
const asyncRoutes1 = [{ path: '/about', component: 'about' }]
// 遍历asyncRoutes，将component替换为map[component]
function mapComponent(routes) {
  routes.forEach(route => {
    route.component = map[route.component]
    if (route.children) {
      route.children.map(child => mapComponent(child))
    }
  })
}
mapComponent(asyncRoutes1)
