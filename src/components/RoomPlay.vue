<template>
  <div class="player-view">
    <!-- 房间header 返回按钮、房间标题 -->
    <div class="roomplay_header">
      <router-link :to="{path: './'}">
        <button class="back_to_home" @click="leaveRoom($route.query.id)"></button>
      </router-link>
      <p class="room-title">{{roomData.Name}}</p>
    </div>
    <!-- 娃娃机画面 -->
    <div class="video-canvas">
      <div class="container">
        <!-- <img class="video" src="../static/pic/switch_bg.png"> -->
        <el-table  v-loading.fullscreen.lock="$store.state.isLoading == true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" style="height: 600px position: absolute;">
        </el-table>
        <canvas id="video-canvas" class="canvas-video" v-insert-video:once="mainWsStream"></canvas>
<!--         <div class="overlay-header">
          <div class="roomplay_header">
            <router-link :to="{path: './'}">
              <button class="back_to_home" @click="leaveRoom($route.query.id)"></button>
            </router-link>
            <p class="room-title">{{roomData.Name}}</p>
          </div>
        </div> -->
        <!-- 围观头像 -->
        <div class="overlay">
          <div class="crowd-info">
            <div class="crowd-num">
              <div class="crowd-count">
                <span>围观:{{roomData.CrowdCount}}</span>
              </div>
              <div class="queue-count">
                <span>排队:{{roomData.Queued}}</span>
              </div>
            </div>

            <div v-for="user in roomData.Crowd" v-bind:key="user.Id">
              <div class="crowd">
                <img class="crowd_Avatar" :src="user.AvatarUrl" alt="">
              </div>
            </div>
          </div>
        </div>
        <!-- 屏幕左上，玩家状态 -->
        <transition name="el-fade-in-linear">
<!--           <div v-if="$store.state.roomState === 'Queueing'" class="overlay-playing">
            <div class="playing_wrapper">
              <span>玩家 排队中</span>
            </div>
          </div>
          <div v-if="$store.state.roomState === 'Catching'" class="overlay-playing">
            <div class="playing_wrapper">
              <span>玩家 热玩中</span>
            </div>
          </div> -->
          <div v-show="$store.state.playingUrl !== ''" class="overlay-playing">
            <img :src="$store.state.playingUrl" alt="">
            <p>{{$store.state.playingName}}</p>
            <p class="overlay-playing-title">热玩中</p>
          </div>
        </transition>
        <!-- 切换摄像头按钮 -->
        <div class="overlay-camera">
          <button class="camera_toggle" @click="toggleCamera"></button>
        </div>
      </div>
    </div>

    <!-- 控制面板 -->
    <div class="control">
        <div v-show="roomState == 'MqttConnected'" class="connected_wrapper">
          <div class="balance_info">
            <p>本次:<span>{{roomData.Coin}}币</span></p>
            <p>余额:<span>{{balance * 10}}币</span></p>
          </div>
          <div class="queue">
            <button @click="queue" class="queue-button">预约抓娃娃</button>
          </div>
          <div class="charge">
            <img src="../../static/pic/coin.png" alt="">
            <el-tooltip content="关注 一起抓抓抓 微信公众号 充值" placement="top">
              <button>充值</button>
            </el-tooltip>
          </div>
        </div>
        <div v-show="roomState == 'Queueing'">
          <button class="queueing-button"><i class="el-icon-loading"></i>{{roomData.Queued}}人正在排队</button>
        </div>
    <!--     <transition name="el-fade-in"> -->
        <div v-show="roomState == 'Prepared'" class="confirm">
          <!-- 尝试使用el-button class="confirm-button" -->
          <el-button-group v-show="this.$store.state.isFailed === false">
            <el-button type="primary" @click="sendReady(true, roomTopic)">赶紧开始</el-button>
            <el-button type="warning" @click="sendReady(false, roomTopic)">我放弃</el-button>
          </el-button-group>
          <el-button-group v-show="this.$store.state.isFailed === true">
            <el-button type="primary" @click="sendReady(true, roomTopic)">再来一局</el-button>
            <el-button type="warning" @click="sendReady(false, roomTopic)">无力再战</el-button>
          </el-button-group>
<!--           <button class="confirm-button" @click="sendReady(true, roomTopic)">赶紧开始</button>
          <button class="confirm-button" @click="sendReady(false, roomTopic)">我放弃</button> -->
          <roomplay-countdown class="prepare-countdown" :rTime="7"></roomplay-countdown>
        </div>
    <!--     </transition> -->
        <div v-show="roomState == 'InsufficientBalance'">
          <button class="queueing-button">余额不足</button>
        </div>
        <div  v-show="roomState == 'Catching'" id="operation-panel" class="operation-panel">
            <div class="direction-wrapper">
              <div class="operation-arrow">
              </div>
              <div class="overlay-arrow-up">
                <button id="arrow-up" class="arrow-up arrow-key" @mousedown.stop.prevent="longTapControlEventHandler(0, 100, 'ctrl/' + roomData.DeviceId)" @mouseup="stopMovingHandler" @touchstart="longTapControlEventHandler(0, 100, 'ctrl/' + roomData.DeviceId)" @touchend="stopMovingHandler">
                </button>
              </div>
              <!-- <button id="arrow-up" class="arrow-up arrow-key" v-touch:tap="tapControlWithParam(0, 100, 'ctrl/' + roomData.DeviceId)"></button> -->
              <div class="overlay-arrow-down">
                <button id="arrow-down" class="arrow-down arrow-key" @mousedown.stop.prevent="longTapControlEventHandler(2, 100, 'ctrl/' + roomData.DeviceId)" @mouseup="stopMovingHandler" @touchstart.stop.prevent="longTapControlEventHandler(2, 100, 'ctrl/' + roomData.DeviceId)" @touchend="stopMovingHandler"></button>
              </div>
<!--               <div class="overlay-arrow-left">
                <button id="arrow-left" class="arrow-left arrow-key" @mousedown.stop.prevent="longTapControlEventHandler(1, 100, 'ctrl/' + roomData.DeviceId)" @mouseup="stopMovingHandler" @touchstart="longTapControlEventHandler(1, 100, 'ctrl/' + roomData.DeviceId)" @touchend="stopMovingHandler"></button>
              </div> -->
              <div class="overlay-arrow-left">
                <button id="arrow-left" class="arrow-left arrow-key" @mousedown.stop.prevent="longTapControlEventHandler(1, 100, 'ctrl/' + roomData.DeviceId)" @mouseup="stopMovingHandler" @touchstart.stop.prevent="longTapControlEventHandler(1, 100, 'ctrl/' + roomData.DeviceId)" @touchend="stopMovingHandler"></button>
              </div>
              <div class="overlay-arrow-right">
                <button id="arrow-right" class="arrow-right arrow-key" @mousedown.stop.prevent="longTapControlEventHandler(3, 100, 'ctrl/' + roomData.DeviceId)" @mouseup="stopMovingHandler" @touchstart="longTapControlEventHandler(3, 100, 'ctrl/' + roomData.DeviceId)" @touchend="stopMovingHandler"></button>
              </div>
            </div>
            <div class="operation-space">
              <button id="space" class="space arrow-key" @click="sendCmdGo('ctrl/' + roomData.DeviceId)"></button>
            </div>
        </div>
    </div>
    <!-- detailTab -->
    <el-tabs v-model="activeName" >
      <el-tab-pane label="娃娃详情" name="first">
        <img v-show="false" src="https://www.liehuo55.com/uploads/301bbe4ae1dbf3e88a858c814fca07129cecbce5.jpg" alt="">
        <div v-show="roomData.Doll" class="pic">
          <ul class="pic_ul">
            <li v-for="pic in roomData.Doll.Item.Pictures" v-bind:key="pic.Path" class="pic_li">
              <img :src="'http://zhua.liehuo55.com' + pic.Path" alt="">
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="second">
        <div class="rank_wrapper">
          <li v-for="rank in roomRank.Rank" v-bind:key="rank.Id" class="rank">
            <div class="avatar">
              <img class="rankAvater" :src="rank.AvatarUrl" alt="">
            </div>
            <div class="name">
              <span>{{rank.NickName}}</span>
            </div>
            <div class="count">
              <span class="count">{{rank.CaughtCount}}</span>
            </div>
          </li>
        </div>
      </el-tab-pane>
      <el-tab-pane label="抓中记录" name="third">
        <div class="logs_wrapper">
          <li v-for="log in roomRank.Logs" v-bind:key="log.Timestamp" class="logs">
            <div class="avatar">
              <img class="rankAvater" :src="log.AvatarUrl" alt="">
            </div>
            <div class="name">
              <span>{{log.NickName}}</span>
            </div>
            <div class="time">
              <span class="count">{{utcTimeConvert(log.Timestamp)}}</span>
            </div>
          </li>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 详细信息 -->
    <div v-show="false" class="details">
        <div v-if="false" class="test">
          <p id="connectionStatus"></p>
          <button @click="initMqttClient">connect</button>
          <button @click="disconnect">disconnect</button>
          <button @click="subscribe('ctrl/22143')">subscribe</button>
          <button @click="publishTopic">publish</button>
          <button @click="sendReady(true, roomTopic)">sendReady</button>
          <button @click="PrepareTopic">prepare</button>
          <button @click="playerStart">playerStart</button>
          <button @click="event => { queue() }">排队</button>
          <button @click="login">登陆</button>
          <span v-if="isReady">State Ready</span>
        </div>
        <div class="detail-nav">
          <button @click="changeDetailState('Pic')">娃娃详情</button>
          <button @click="changeDetailState('Rank')">排行榜</button>
          <button @click="changeDetailState('Log')">抓中记录</button>
        </div>
        <transition name="el-zoom-in-top">
          <img v-if="this.$store.state.detailState === 'Pic'" src="https://www.liehuo55.com/uploads/301bbe4ae1dbf3e88a858c814fca07129cecbce5.jpg" alt="">
        </transition>
        <transition name="el-zoom-in-top">
          <div v-if="this.$store.state.detailState === 'Rank'" class="rank_wrapper">
            <li v-for="rank in roomRank.Rank" v-bind:key="rank.Id" class="rank">
              <div class="avatar">
                <img class="rankAvater" :src="rank.AvatarUrl" alt="">
              </div>
              <div class="name">
                <span>{{rank.NickName}}</span>
              </div>
              <div class="count">
                <span class="count">{{rank.CaughtCount}}</span>
              </div>
            </li>
          </div>
        </transition>
        <transition name="el-zoom-in-top">
          <div v-if="this.$store.state.detailState === 'Log'" class="logs_wrapper">
            <li v-for="log in roomRank.Logs" v-bind:key="log.Timestamp" class="logs">
              <div class="avatar">
                <img class="rankAvater" :src="log.AvatarUrl" alt="">
              </div>
              <div class="name">
                <span>{{log.NickName}}</span>
              </div>
              <div class="time">
                <span class="count">{{utcTimeConvert(log.Timestamp)}}</span>
              </div>
            </li>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import playVideo from '../Video.service.js'
import MQTT from '../MQTT.service.js'
import { mapGetters, mapActions } from 'vuex'
import CountDown from './CountDown'
export default {
  components: {
    'roomplay-countdown': CountDown
  },
  data () {
    return {
      videocanvas: 'video-canvas',
      roomData: [],
      roomRank: [],
      balance: 0, // 存储房间排名信息的data
      activeName: 'first',
      isMainCamera: true,
      start: false
    }
  },
  props: ['room'],
  methods: {
    // loadVideo () {
    //   let canvas = document.getElementById('video-canvas')
    //   let url = 'ws://' + '47.97.25.165' + ':8084/'
    //   // var url = 'ws://'+document.location.hostname+':8084/';
    //   let player = new JSMpeg.Player(url, {canvas: canvas})
    //   console.log('ffmpeg success')
    // }
    ...mapActions({
      readyToPlay: 'queueToPlay',
      cancelToPlay: 'cancelToPlay',
      startPlaying: 'startPlaying'
    }),
    closeZoom () {
      document.addEventListener('touchmove', function (event) {
        if (event.scale) {
          if (event.scale !== 1) {
            event.preventDefault()
          }
        }
      }, { passive: false })
    },
    updateTopic () {
      this.$store.dispatch('initRoomTopic', 'notify/' + this.roomData.DeviceId)
    },
    // 排队游戏函数action，触发mutation queueToPlay
    queue () {
      this.$store.dispatch('queueToPlay', this.$route.query.id)
    },
    initMqttClient () {
      // 进入房间，先loading
      this.$store.dispatch('showLoading')
      // 先通过getRoomInfo取得房间deviceId，然后根据deviceId生成对应MQTT client Topci在State中，并注册对应Topic
      apiService.getRoomInfo(this.$route.query.id).then(data => {
        console.log('room info', data)
        this.roomData = data
        console.log('ROOM data init')
        console.log('get Room DeviceId: ', this.roomData.DeviceId)
        // 把State中roomTopic 更新为‘notify/’ + roomData.DeviceId
        this.updateTopic()
        // 对roomTopic建立MQTT联建并subscribe对应Topic
        MQTT.initMqttClient(this.roomTopic)
        // MQTT.subscribeToTopic(window.client, 'notify/' + this.roomData.DeviceId)
        // 获取房间排名数据
        this.getRoomRank(this.$route.query.id)
        // 获取视频地址，播放视频
        console.log('XroomData', this.roomData)
        // playVideo.wsPlay(this.roomData.WStreams[0])
      })
    },
    disconnect () {
      MQTT.disconnect()
    },
    subscribe (topic) {
      MQTT.subscribeToTopic(window.client, topic)
    },
    publishTopic () {
      MQTT.publishMessage({ param: 250 }, 0, 'ctrl/' + '22128')
    },
    sendReady (is, topic) {
      MQTT.sendReadyorPassCmd(is, topic)
      // 设定一个事件，这个时间之后，自动下爪子: 设定timeout似乎没用，一开始就自动下爪子了
      // console.log('现在的this', this)
      // if (is === true) {
      //   setTimeout(this.sendCmdGo('ctrl/' + this.roomData.DeviceId), 600000)
      // }
    },
    // 鼠标单击房间控制事件
    sendControlEventHandler (type, param, topic) {
      MQTT.sendControlEvent(type, param, topic)
    },
    // 持续点击或tap方向控制函数
    longTapControlEventHandler (type, param, topic) {
      // 先清除掉interval
      clearInterval(window.tap)
      MQTT.sendControlEvent(type, param, topic)
      // 持续定时输出控制命令
      window.tap = setInterval(function () {
        MQTT.sendControlEvent(type, 200, topic)
        console.log('长按')
      }, 100)
    },
    // 给tap事件传参的控制函数
    tapControlWithParam (type, param, topic) {
      return function (event, start, end) {
        window.sendControlEventHandler = function (type, param, topic) {
          MQTT.sendControlEvent(type, param, topic)
        }
        window.sendControlEventHandler(type, param, topic)
      }
    },
    // 长按的响应事件
    longtapControlWithParam (type, param, topic) {
      return function (event, start, end) {
        window.sendControlEventHandler = function (type, param, topic) {
          MQTT.sendControlEvent(type, param, topic)
        }
        window.sendControlEventHandler(type, param, topic)
      }
    },
    stopMovingHandler () {
      clearInterval(window.tap)
    },
    sendCmdGo (topic) {
      MQTT.sendControlCmd('go', 200, 2, topic)
      this.stopMovingHandler()
    },
    PrepareTopic () {
      MQTT.publishMessage({ action: 'room_update' }, 0, 'notify/' + '22371')
    },
    playerStart () {
      MQTT.playStart()
    },
    getRoomInfo (id) {
      apiService.getRoomInfo(id).then(data => {
        console.log('room info', data)
        this.roomData = data
        console.log('ROOM data updateing')
        console.log('updated data', this.roomData)
        // 改变状态为roomUpdating false
        this.$store.dispatch('roomStopUpdating')
      })
      apiService.getUserBalance().then(
        data => {
          console.log('balance', data.data)
          this.balance = data.data
          // playVideo.wsPlay('video.liehuo55.com:29001')
        })
    },
    enterRoom (id) {
      apiService.enterRoom(id).then(data => {
        console.log('enter room', data)
      })
    },
    leaveRoom (id) {
      console.log('关闭视频')
      window.wsavc.stopStream()
      playVideo.wsDisconnect()
      // 先改变房间状态为leave，再断开MQTT
      this.$store.dispatch('leaveRoom', id)
      MQTT.destoryMQTT()
      clearInterval(window.tap)
      apiService.leaveRoom(id).then(data => {
        console.log('leave room', data)
      })
    },
    queueToplay (id) {
      apiService.queueToPlay(id).then(data => {
        console.log('queue data', data)
      })
    },
    login () {
      apiService.login().then(data => {
        console.log('login info', data)
      })
    },
    getRoomRank (id) {
      apiService.getRoomRank(id).then(data => {
        console.log('当前房间排名信息:', data.data)
        this.roomRank = data.data
      })
    },
    changeDetailState (detail) {
      this.$store.dispatch('changeDetailState', detail)
    },
    // 事件格式转换
    utcTimeConvert (time) {
      let date = new Date(time)
      let options = {
        // weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return date.toLocaleDateString('zh-cn', options)
      // return date
    },
    // 切换摄像头
    toggleCamera () {
      if (this.isMainCamera) {
        console.log('change main to true', this.mainWsStream)
        this.isMainCamera = false
        playVideo.wsRePlay(this.mainWsStream)
        this.$store.dispatch('showLoading')
      } else {
        console.log('change main to false', this.mainWsStream)
        this.isMainCamera = true
        playVideo.wsRePlay(this.mainWsStream)
        this.$store.dispatch('showLoading')
      }
    }
  },
  created () {
    // 阻止移动端缩放屏幕
    // this.closeZoom()
  },
  mounted () {
    this.initMqttClient()
    this.enterRoom(this.$route.query.id)
    this.getRoomInfo(this.$route.query.id)
    console.log('DeviceId', this.roomData)
    // playVideo.wsPlay('video.liehuo55.com:29001')
  },
  computed: {
    ...mapGetters(['isReady', 'isPlaying', 'roomTopic', 'roomState']),
    canvasReady: {
      get: function () {
        return document.getElementById('video-canvas') !== null
      },
      set: function (newValue) {
        console.log('视频状态改变')
      }
    },
    mainWsStream: {
      // getter
      get: function () {
        if (this.isMainCamera) {
          return this.roomData.WStreams[0]
        } else {
          return this.roomData.WStreams[1]
        }
      },
      // setter
      set: function (newValue) {
      }
    }
  },
  watch: {
    '$store.state.roomUpdating': {
      handler: function (newer, older) {
        this.getRoomInfo(this.$route.query.id) // 执行methods中getRoomInfo方法
        this.getRoomRank(this.$route.query.id) // 执行更新rank的数据
      },
      deep: true // 开启深度监听
    },
    // 监听canvas是否建立，开始播放视频
    'canvasReady': {
      handler: function (newer, older) {
        console.log('视频 ready')
        // playVideo.wsPlay('video.liehuo55.com:29001')
      }
    }
  },
  directives: {
    insertVideo: {
      // 只在bind执行一次播放视频
      bind: function (canvasElement, binding) {
        let canvas = canvasElement
        window.canvas = canvas
        // if (window.wsavc !== null) {
        //   playVideo.wsRePlay(binding.value)
        // }
        playVideo.wsPlay(window.canvas, binding.value)
        // let ctx = canvas.getContext('2d')
        // ctx.clearReact(20, 20, 100, 501)
      },
      unbind: function () {
        // unbind时断开视频连接
        playVideo.wsDisconnect()
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.el-table {
  opacity: 0;
  height: 0;
}
.el-tabs__nav {
  float: right;
  .el-tabs__active-bar {
    left: 16%;
  }
}
.player-view {
  /*  测试tabs */
  .el-tabs {
    background-color: #FFFFFF;
    width: 350px;
    max-width: 95%;
    height: 650px;
    border-radius: 10px;
    margin: 10px auto;
    .el-tab-pane {
      overflow-y: scroll;
      .pic {
        .pic_ul {
          display: block;
          padding: 0;
          .pic_li {
            list-style: none;
            img {
              text-align: center;
            }
          }
        }
      }
    }
  }
  display: block;
  background-color: #edc83a;
  max-width: 100%;
  overflow-x:hidden;
  /* 房间header */
  .roomplay_header {
    margin: 0 auto;
    width: 350px;
    max-width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    .back_to_home {
      border-style: none;
      width: 30px;
      height: 30px;
      background: url(../../static/pic/goback.png) no-repeat;
      background-size: 30px 30px;
      flex-grow: 0;
    }
    /* 房间标题*/
    .room-title {
      flex-grow: 1;
      margin: 0;
      font-size: 1rem;
      padding: 2rem;
    }
  }
  /* 视频画面*/
  .video-canvas {
    width: 360px;
    max-width: 95%;
    margin: 0 auto;
    canvas {
      display: block;
      width: 360px;
      max-width: 100%;
    }
    .container {
      position: relative;
      img {
        display: block;
        width: 360px;
        max-width: 95%;
        position: relative;
        /*  其他玩家的头像显示 */
        width: 48px;
        /*border-radius: 40px;*/
      }
      /* 叠加到画面上的head*/
      .overlay-header {
        position: absolute;
        top: 0;
      }
      /* 叠加在视频上的叠加层*/
      .overlay {
        position: absolute;
        top: 0;
        right: 0;
        /* 围观信息*/
        .crowd-info {
          display: flex;
          background-color: #303133;
          opacity: 0.8;
          max-width: 95%;
          border-radius: 30px 0 0 30px;
          padding: 0.2em 1.32em;
          padding-right: 0.3em;
          .crowd-count {
            color: #fff;
            height: 50%;
            font-size: 0.5rem;
            margin-right: 0.3rem;
          }
          .queue-count {
            color: #e67200;
            height: 50%;
            font-size: 0.5rem;
            margin-right: 0.3rem;
          }
          .crowd {
            overflow: hidden;
            img {
              display: inline-block;
              width: 25px;
              height: 25px;
              border-radius: 40px;
              overflow: hidden;
              -webkit-box-shadow: 0 0 3px #ccc;
              box-shadow: 0 0 3px #ccc;
              border: 2px solid white;
              margin-top: 0.2rem;
            }
          }
        }
      }
      .overlay-playing {
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        background-color: #303133;
        opacity: 0.7;
        width: 120px;
        max-width: 30%;
        .playing_wrapper {
          background-color: #121f32;
        }
        img {
          display: inline-block;
          width: 40px;
          height: 40px;
          border-radius: 40px;
          overflow: hidden;
          -webkit-box-shadow: 0 0 3px #ccc;
          box-shadow: 0 0 3px #ccc;
          border: 2px solid white;
          margin-top: 0.2rem;
        }
        p {
          font-size: 14px;
        }
        .overlay-playing-title {
          color: #e67200;
        }
      }
      .overlay-camera {
        position: absolute;
        top: 50%;
        right: -2px;
        background-color: #e2be46;
        height: 32px;
        width: 32px;
        border-right: none;
        z-index: 999;
        background: url(../../static/pic/switch_button.png) no-repeat scroll top
          right transparent;
        background-size: cover;
        .camera_toggle {
          border-style: none;
          background: none;
          width: 48px;
          height: 48px;
        }
      }
    }
  }
  /* 控制部分 */
  .control {
    width: 350px;
    max-width: 95%;
    height: 100px;
    margin: 0 auto;
    margin-top: -20px;
    /* 排队wrapper */
    .connected_wrapper {
      display: flex;
      box-sizing: border-box;
      width: 360px;
      max-width: 100%;
      height: 50px;
      margin: 0 auto;
      justify-content: space-between;
      align-items: center;
      padding-top:20px;
      .balance_info {
        font-size: 13px;
        margin: 0;
        text-align: left;
        p {
          padding: 0;
          margin: 0;
        }
        span {
          color: #FFFFFF;
        }
      }
      .queue {
        .queue-button {
          box-sizing: border-box;
          display: inline-block;
          padding: 0 1.32em;
          line-height: 2.3;
          font-size: 1rem;
          border-radius: 1.5rem;
          background-color: #4d2d05;
          color: #fff;
        }
      }
      .charge {
        display: flex;
        align-items: center;
        background-color: #303133;
        max-width: 100%;
        border-radius: 30px 0 0 30px;
        padding: 0.2em 0.32em;
        padding-right: 0.2em;
        opacity: 0.8;
        img {
          width: 20px;
          height: 20px;
        }
        button {
          box-sizing: border-box;
          background: none;
          color: #FFFFFF;
        }
      }
    }

    /* 正在排队 */
    .queueing-button {
      box-sizing: border-box;
      display: inline-block;
      padding: 0 1.32em;
      line-height: 2.3;
      font-size: 1rem;
      margin-top: 20px;
      border-radius: 1.5rem;
      background-color: #E2BE46;
      color: #4d2d05;
    }
    /* 确认开始游戏按钮*/
    .confirm-button {
      box-sizing: border-box;
      display: inline-block;
      padding: 0 1.32em;
      line-height: 2.3;
      font-size: 1rem;
      margin-top: 20px;
      border-radius: 1.5rem;
      background-color: #67C23A;
      color: #FFFFFF;
    }
    .confirm-button:hover {
      background-color: #fff;
      color: #4d2d05;
    }
    /* 准备状态倒计时*/
    .prepare-countdown {
      font-size: 9rem;
      position: absolute;
      top: 30%;
      left: 40%;
      color: #409EFF;
    }
    /* 移动设备触摸板*/
    .operation-panel {
      /*display: none;*/
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 360px;
      max-width: 100%;
      height: 100px;
      bottom: 40px;
      /*      left: 55%;*/
      margin: 0 auto;
      margin-top: -40px;
      user-select: none;
      background-color: none;
      .direction-wrapper{
        /* 控制上下左右*/
        position: relative;
        .operation-arrow {
          position: relative;
          background-color: #fff;
          width: 100px;
          // max-width: 50%;
          height: 100px;
          border-radius: 100px;
          margin-left: 0px
        }
        .overlay-arrow-up {
          position: absolute;
          top: 0;
          left: 35px;
          background-color: #e2be46;
          width: 32px;
          height: 32px;
          z-index: 999;
          // background-color: transparent;
          background: url(../../static/pic/up.png) no-repeat;
          background-size: cover;
          .arrow-up {
            border-style: none;
            background: none;
            width: 32px;
            height: 32px;
          }
        }
        .overlay-arrow-down {
          position: absolute;
          top: 70%;
          left: 35px;
          background-color: #e2be46;
          width: 32px;
          height: 32px;
          z-index: 999;
          // background-color: transparent;
          background: url(../../static/pic/down.png) no-repeat;
          background-size: cover;
          .arrow-down {
            border-style: none;
            background: none;
            width: 32px;
            height: 32px;
          }
        }
        .overlay-arrow-left {
          position: absolute;
          top: 35%;
          left: 0px;
          background-color: #e2be46;
          width: 32px;
          height: 32px;
          z-index: 999;
          // background-color: transparent;
          background: url(../../static/pic/left.png) no-repeat;
          background-size: cover;
          .arrow-left {
            border-style: none;
            background: none;
            width: 32px;
            height: 32px;
          }
        }
        .overlay-arrow-right {
          position: absolute;
          top: 35%;
          left: 70px;
          background-color: #e2be46;
          width: 32px;
          height: 32px;
          z-index: 999;
          // background-color: transparent;
          background: url(../../static/pic/right.png) no-repeat;
          background-size: cover;
          .arrow-right {
            border-style: none;
            background: none;
            width: 32px;
            height: 32px;
          }
        }
      }
    }
    .operation-space {
      background-color: #FFFFFF;
      width: 90px;
      height: 90px;
      z-index: 999;
      // background-color: transparent;
      background: url(../../static/pic/catch_icon.png) no-repeat;
      background-size: contain;
      margin-right: 30px;
      .space {
        border-style: none;
        background: none;
        width: 90px;
        height: 90px;
      }
    }
  }
  /*  测试tabs */
  /* 详细信息*/
  .details {
    margin: 70px auto;
    width: 360px;
    max-width: 100%;
    .detail-nav {
      display: flex;
      justify-content: space-around;
      margin: 0;
      border-radius: 10px 10px 0 0;
      background-color: #fff;
      button {
        border-style: none;
        padding: 0.7em 1.32em;
        background-color: #fff;
        font-size: 1rem;
        border-radius: 10px;
      }
    }
    img {
      width: 100%;
    }
  }
  /* 排行榜 */
  .rank_wrapper {
    background-color: white;
    width: 360px;
    max-width: 100%;
    position: relative;
    height: 100%;
    max-height: 90%;
    overflow: hidden;
    box-sizing: border-box;
    /*border: 0 0 10px 10px;*/
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 12px;
    .rank {
      display: flex;
      background-color: white;
      border-bottom: solid 1px #e6e4e5;
      div {
        display: inline-block;
        overflow: hidden;
        padding: 5px;
        height: 30px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        flex-grow: 0;
        img {
          height: 30px;
          width: auto;
          border-radius: 30px;
          border: solid 1px #fff;
        }
      }
      .name {
        width: 60%;
        flex-grow: 0;
        text-align: left;
      }
      .count {
        width: 20%;
        flex-grow: 1;
      }
    }
  }
  /* 抓中记录 */
  .logs_wrapper {
    background-color: white;
    width: 360px;
    max-width: 100%;
    position: relative;
    overflow: scroll;
    box-sizing: border-box;
    font-size: 12px;
    .logs {
      display: flex;
      background-color: white;
      border-bottom: solid 1px #e6e4e5;
      div {
        display: inline-block;
        overflow: hidden;
        padding: 5px;
        height: 40px;
      }
      .avatar {
        width: 30px;
        height: 30px;
        flex-grow: 0;
        img {
          height: 30px;
          width: auto;
          border-radius: 30px;
          border: solid 1px #fff;
        }
      }
      .name {
        width: 40%;
        flex-grow: 0;
        text-align: left;
      }
      .time {
        width: 40%;
        flex-grow: 1;
      }
    }
  }
}
</style>
