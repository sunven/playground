import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/product',
      component: '@/pages/product/_layout',
      routes: [{ path: '/product/:id', component: '@/pages/product/[id]' }],
    },
    { path: '/more', component: '@/pages/more/index' },
    { component: '@/pages/404/index' },
  ],
  fastRefresh: {},
});
