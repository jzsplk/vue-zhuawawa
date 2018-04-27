import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isReady: false
}

const store = new Vuex.Store({
  state,
  getters: {
    isReady: (state) => {
      return state.isReady
    }
  },
  actions: {
    queueToPlay (context) {
      context.commit('queueToPlay')
    },
    cancelToPlay (context) {
      context.commit('cancelToPlay')
    }
  },
  mutations: {
    queueToPlay (state) {
      state.isReady = true
    },
    cancelToPlay (state) {
      state.isReady = false
    }
  }
})

export default store
