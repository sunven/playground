import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    state: {
      count: 100,
    },
    mutations: {
      init(state, count) {
        state.count = count
      },
      add(state) {
        state.count++
      },
    },
    actions: {
      getCount({ commit }) {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log('getCount')
            commit('init', Math.random() * 100)
            resolve()
          }, 1000)
        })
      },
    },
    modules: {},
  })
}
