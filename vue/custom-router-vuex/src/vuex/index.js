let Vue = null
class Store {
  constructor(options) {
    const store = this
    this._mutations = options.mutations
    this._actions = options.actions
    this._getters = options.getters
    this.getters = {}
    //
    //Vue.util.defineReactive(this, 'state', options.state)
    //
    this._vm = new Vue({
      data: {
        state: options.state,
      },
      computed: getComputed(),
    })

    //1.将getter转换为vue的computed
    //2.给暴露的getters添加只读属性
    function getComputed() {
      const computed = {}
      for (let key in store._getters) {
        computed[key] = function() {
          return store._getters[key](store.state)
        }
        Object.defineProperty(store.getters, key, {
          get() {
            return store._vm[key]
          },
        })
      }
      return computed
    }

    //解决this指向问题
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    //_data===$data
    return this._vm._data.state
  }
  set state(v) {
    console.error('use replaceState set state')
  }

  // get getters() {
  //   return this._vm.$computed
  // }

  commit(type, payload) {
    const mutation = this._mutations[type]
    mutation(this.state, payload)
  }

  dispatch(type, payload) {
    const action = this._actions[type]
    //这里传的this需要处理，外部触发调用时this指向可能改变
    action(this, payload)
  }
}
const install = function(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    },
  })
}

export default { Store, install }
