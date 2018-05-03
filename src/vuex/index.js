import Vue from 'vue'
import Vuex from 'vuex'
// import apiService from '../API.service.js'

Vue.use(Vuex)

const state = {
  isReady: false,
  isPlaying: false,
  roomTopic: 'notify/'
}

const store = new Vuex.Store({
  state,
  getters: {
    isReady: (state) => {
      return state.isReady
    },
    isPlaying: (state) => {
      return state.isPlaying
    },
    roomTopic: (state) => {
      return state.roomTopic
    }
  },
  actions: {
    queueToPlay (context) {
      context.commit('queueToPlay')
    },
    cancelToPlay (context) {
      context.commit('cancelToPlay')
    },
    startPlaying (context) {
      context.commit('startPlaying')
    },
    initRoomTopic (context, id) {
      context.commit('initRoomTopic', id)
    }
  },
  mutations: {
    queueToPlay (state) {
      state.isReady = true
    },
    cancelToPlay (state) {
      state.isReady = false
      state.isPlaying = false
    },
    startPlaying (state) {
      state.isPlaying = true
      setTimeout(function () {
        state.isPlaying = false
        state.isReady = false
      }, 30000)
    },
    initRoomTopic (state, id) {
      state.roomTopic = id
    }
  }
})

export default store
