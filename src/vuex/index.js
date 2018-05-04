import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../API.service.js'

Vue.use(Vuex)

const state = {
  isReady: false,
  isPlaying: false,
  roomTopic: 'notify/',
  roomState: 'loading'
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
    },
    roomState: (state) => {
      return state.roomState
    }
  },
  actions: {
    queueToPlay (context, id) {
      context.commit('queueToPlay', id)
    },
    cancelToPlay (context) {
      context.commit('cancelToPlay')
    },
    startPlaying (context) {
      context.commit('startPlaying')
    },
    initRoomTopic (context, id) {
      context.commit('initRoomTopic', id)
    },
    showStartQueue (context) {
      context.commit('showStartQueue')
    },
    showConfirm (context) {
      context.commit('showConfirm')
    },
    showPanel (context) {
      context.commit('showPanel')
    },
    stopCatching (context) {
      context.commit('stopCatching')
    },
    InsufficientBalance (context) {
      context.commit('InsufficientBalance')
    }
  },
  mutations: {
    queueToPlay (state, id) {
      state.isReady = true
      // 状态变为Queueing
      state.roomState = 'Queueing'
      apiService.queueToPlay(id).then(data => {
        console.log('queue data', data)
        // 30秒后状态还原
        // setTimeout(function () {
        //   state.roomState = 'MqttConnected'
        // }, 30000)
      }).catch(e => {
        console.log('queue error', e)
      })
    },
    cancelToPlay (state) {
      state.roomState = 'loading'
    },
    startPlaying (state) {
      state.isPlaying = true
      setTimeout(function () {
        state.roomState = 'MqttConnected'
      }, 30000)
    },
    initRoomTopic (state, id) {
      state.roomTopic = id
    },
    showStartQueue (state) {
      state.roomState = 'MqttConnected'
    },
    showConfirm (state) {
      state.roomState = 'Prepared'
    },
    showPanel (state) {
      state.roomState = 'Catching'
    },
    stopCatching (state) {
      state.roomState = 'MqttConnected'
    },
    InsufficientBalance (state) {
      state.roomState = 'InsufficientBalance'
    }
  }
})

export default store
