import Vue from 'vue'
import Router from './router'
import Foo from '@/components/Foo.vue'
import Bar from '@/components/Bar.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/foo',
      name: 'foo',
      component: Foo,
    },
    {
      path: '/bar',
      name: 'bar',
      component: Bar,
      children: [
        {
          path: '/bar/bar-1',
          name: 'bar-1',
          component: {
            render(h) {
              return h('div', 'this is bar-1')
            },
          },
        },
        {
          path: '/bar/bar-2',
          name: 'bar-3',
          component: {
            render(h) {
              return h('div', 'this is bar-2')
            },
          },
        },
      ],
    },
  ],
})

export default router
