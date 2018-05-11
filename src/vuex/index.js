import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../API.service.js'

Vue.use(Vuex)

const state = {
  isReady: false,
  isPlaying: false,
  roomTopic: 'notify/', // 房间notify topic
  roomState: 'leave', // 房间状态
  playerId: '123',
  token: '456',
  playerInfo: {}, // 玩家详细信息
  roomUpdating: false, // 控制房间更新的状态
  isLogin: false, // 是否已登陆，切换登陆页面的按钮
  detailState: 'Rank', //  房间detail的状态
  isVideoReady: 'false'
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
    },
    playerId: (state) => {
      return state.playerId
    },
    token: (state) => {
      return state.token
    },
    roomUpdating: (state) => {
      return state.roomUpdating
    },
    changeDetailState: (state) => {
      return state.detailState
    },
    isVideoReady: (state) => {
      return state.isVideoReady
    }
  },
  actions: {
    queueToPlay (context, id) {
      context.commit('queueToPlay', id)
    },
    cancelToPlay (context) {
      context.commit('cancelToPlay')
    },
    leaveRoom (context) {
      context.commit('leaveRoom')
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
    },
    // 更新用户数据action，id跟token, 注意这里第二个参数要用obj，把需要操作的变量放到obj中
    updataPlayerInfo (context, obj) {
      context.commit('updataPlayerInfo', obj)
    },
    roomUpdating (context) {
      context.commit('roomUpdating')
    },
    roomStopUpdating (context) {
      context.commit('roomStopUpdating')
    },
    // 更换detail状态的action
    changeDetailState (context, detail) {
      context.commit('changeDetailState', detail)
    },
    // 视频ready
    startVideo (context) {
      context.commit('startVideo')
    },
    // 关闭视频
    stopVideo (context) {
      context.commit('stopVideo')
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
    leaveRoom (state) {
      state.roomState = 'leave'
      state.isPlaying = false
    },
    startPlaying (state) {
      state.isPlaying = true
      setTimeout(function () {
        state.roomState = 'MqttConnected'
      }, 30000)
    },
    initRoomTopic (state, id) {
      state.roomTopic = id
      state.isPlaying = true
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
    },
    // 更新用户信息mutation
    updataPlayerInfo (state, obj) {
      state.playerId = obj.playerId
      state.token = obj.token
      state.playerInfo.name = obj.name
      state.playerInfo.AvatarUrl = obj.AvatarUrl
    },
    roomUpdating (state) {
      state.roomUpdating = true
    },
    roomStopUpdating (state) {
      state.roomUpdating = false
    },
    // 更改detailState的mutation
    changeDetailState (state, detail) {
      state.detailState = detail
    },
    startVideo (state) {
      state.isVideoReady = true
    },
    stopVideo (state) {
      state.isVideoReady = false
    }
  }
})

export default store
