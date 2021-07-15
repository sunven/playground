//Component组件配置对象
import Vue from 'vue'
export default function create(Component, props) {
  //方法一
  const Cotr = Vue.extend(Component)
  const vm = new Cotr({ propsData: props }).$mount()
  document.body.appendChild(vm.$el)
  vm.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return vm

  //方法二
  //   const vm = new Vue({
  //     render(h) {
  //       return h(Component, { props })
  //     },
  //   }).$mount()
  //   document.body.appendChild(vm.$el)
  //   const comp = vm.$children[0]
  //   comp.remove = function() {
  //     document.body.removeChild(vm.$el)
  //     comp.$destroy()
  //   }
  //   return comp
}
