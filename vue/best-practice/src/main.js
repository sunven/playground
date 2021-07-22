import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vPermission from './directives/permission'

Vue.directive('permission', vPermission)

Vue.config.productionTip = false

import '@/assets/icons'
import './permission'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
