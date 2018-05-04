<template>
  <div class="player-view">
    <p class="room-title">{{roomData.Name}}</p>

    <!-- 娃娃机画面 -->
    <div class="video-canvas">
      <canvas :id="videocanvas"></canvas>
      <div class="container">
        <img class="video" src="../assets/switch_bg.png">
        <!-- 围观头像 -->
        <div class="overlay">
          <div class="crowd-info">
            <div class="crowd-num">
              <div class="crowd-count">
                <span>围观：{{roomData.CrowdCount}}</span>
              </div>
              <div class="queue-count">
                <span>排队：{{roomData.Queued}}</span>
              </div>
            </div>

            <div v-for="user in roomData.Crowd" v-bind:key="user.Id">
              <div class="crowd">
                <img class="crowd_Avatar" :src="user.AvatarUrl" alt="">
              </div>
            </div>
          </div>
        </div>
        <div v-if="$store.state.roomState === 'Queueing'" class="overlay-playing">
          <div class="playing_wrapper">
            <span>玩家 排队中</span>
          </div>
        </div>
        <div v-if="$store.state.roomState === 'Catching'" class="overlay-playing">
          <div class="playing_wrapper">
            <span>玩家 热玩中</span>
          </div>
        </div>
      </div>

    </div>

    <!-- 控制面板 -->
    <div v-if="roomState == 'MqttConnected'">
      <button @click="queue" class="queue-button">预约抓娃娃</button>
    </div>
    <div v-if="roomState == 'Queueing'">
      <button class="queueing-button">正在排队</button>
    </div>
    <div v-if="roomState == 'Prepared'" class="confirm">
      <button class="confirm-button" @click="sendReady(true, roomTopic)">赶紧开始</button>
      <button class="confirm-button" @click="sendReady(false, roomTopic)">我放弃</button>
    </div>
    <div v-if="roomState == 'InsufficientBalance'">
      <button class="queueing-button">余额不足</button>
    </div>
    <div  v-if="roomState == 'Catching'" id="operation-panel" class="operation-panel">
        <div class="operation-arrow">
          <button id="arrow-up" class="arrow-up arrow-key" @click="sendControlEvent(0, 100, 'ctrl/' + roomData.DeviceId)"></button>
          <button id="arrow-down" class="arrow-down arrow-key" @click="sendControlEvent(2, 100, 'ctrl/' + roomData.DeviceId)"></button>
          <button id="arrow-left" class="arrow-left arrow-key" @click="sendControlEvent(1, 100, 'ctrl/' + roomData.DeviceId)"></button>
          <button id="arrow-right" class="arrow-right arrow-key" @click="sendControlEvent(3, 100, 'ctrl/' + roomData.DeviceId)"></button>
        </div>
        <button id="space" class="space arrow-key" @click="sendCmdGo('ctrl/' + roomData.DeviceId)"></button>
    </div>
    <!-- 详细信息 -->
    <div class="details">
        <div class="test">
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
          <button>排行榜</button>
          <button>抓中记录</button>
          <button>我的</button>
        </div>
        <img src="https://www.iqi1.com/uploads/301bbe4ae1dbf3e88a858c814fca07129cecbce5.jpg" alt="">
        <ol v-for="rank in roomRank.Rank" v-bind:key="rank.Id" class="rank">
            <li>
              <img class="rankAvater" :src="rank.AvatarUrl" alt="">
              <span>{{rank.NickName}}</span>
              <span class="count">{{rank.CaughtCount}}</span>
            </li>
        </ol>
    </div>
  </div>
</template>

<script>
import apiService from '../API.service.js'
// import playVideo from '../Video.service.js'
import MQTT from '../MQTT.service.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      videocanvas: 'video-canvas',
      roomData: [],
      roomRank: [] // 存储房间排名信息的data
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
    updateTopic () {
      this.$store.dispatch('initRoomTopic', 'notify/' + this.roomData.DeviceId)
    },
    // 排队游戏函数action，触发mutation queueToPlay
    queue () {
      this.$store.dispatch('queueToPlay', this.$route.query.id)
    },
    initMqttClient () {
      // 先通过getRoomInfo取得房间deviceId，然后根据deviceId生成对应MQTT client Topci在State中，并注册对应Topic
      apiService.getRoomInfo(this.$route.query.id).then(data => {
        console.log('room info', data)
        this.roomData = data
        console.log('ROOM data update')
        console.log('DeviceId 2', this.roomData.DeviceId)
        // 把State中roomTopic 更新为‘notify/’ + roomData.DeviceId
        this.updateTopic()
        // 对roomTopic建立MQTT联建并subscribe对应Topic
        MQTT.initMqttClient(this.roomTopic)
        // MQTT.subscribeToTopic(window.client, 'notify/' + this.roomData.DeviceId)
        // 获取房间排名数据
        this.getRoomRank(this.$route.query.id)
      })
    },
    disconnect () {
      MQTT.disconnect()
    },
    subscribe (topic) {
      MQTT.subscribeToTopic(window.client, topic)
    },
    publishTopic () {
      MQTT.publishMessage({param: 250}, 0, 'ctrl/' + '22128')
    },
    sendReady (is, topic) {
      MQTT.sendReadyorPassCmd(is, topic)
    },
    sendControlEvent (type, param, topic) {
      MQTT.sendControlEvent(type, param, topic)
    },
    sendCmdGo (topic) {
      MQTT.sendControlCmd('go', 200, 2, topic)
    },
    PrepareTopic () {
      MQTT.publishMessage({action: 'room_update'}, 0, 'notify/' + '22371')
    },
    playerStart () {
      MQTT.playStart()
    },
    getRoomInfo (id) {
      apiService.getRoomInfo(id).then(data => {
        console.log('room info', data)
        this.roomData = data
        console.log('ROOM data updateing')
        console.log('DeviceId 2', this.roomData)
        this.$store.dispatch('roomStopUpdating')
      })
    },
    enterRoom (id) {
      apiService.enterRoom(id).then(data => {
        console.log('enter room', data)
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
        console.log('房间排名data： ', data.data)
        this.roomRank = data.data
      })
    }
  },
  created () {
  },
  mounted () {
    // playVideo.play()
    this.initMqttClient()
    this.enterRoom(this.$route.query.id)
    this.getRoomInfo(this.$route.query.id)
    console.log('DeviceId', this.roomData)
  },
  computed: {
    ...mapGetters(['isReady', 'isPlaying', 'roomTopic', 'roomState'])
  },
  watch: {
    '$store.state.roomUpdating': {
      handler: function (newer, older) {
        this.getRoomInfo(this.$route.query.id) // 执行methods中getRoomInfo方法
        this.getRoomRank(this.$route.query.id) // 执行更新rank的数据
      },
      deep: true // 开启深度监听
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.player-view {
  display: block;
  background-color: #EDC83A;
  /* 房间标题*/
  .room-title {
    margin: 0;
    font-size: 2rem;
    padding: 2.0rem
  }
  /* 视频画面*/
  .video-canvas {
    width: 360px;
    margin: 0 auto;
    canvas {
      display: block;
      width: 360px;
    }
    .container {
      position: relative;
      img {
        display: block;
        width: 360px;
        position: relative;
      }
      .overlay {
        position: absolute;
        top: 0;
        right: 0;
        /* 围观信息*/
        .crowd-info {
          display: flex;
          background-color: #112B44;
          min-width: 100px;
          border-radius:30px 0 0 30px;
          padding-left: 20px;
          .crowd-count {
            color: #FFF;
            height: 50%;
          }
          .queue-count {
            color: #E67200;
            height: 50%;
          }
          .crowd {
            overflow:hidden;
            img{
              display:inline-block;
              width:60px;
              height:60px;
              border-radius:60px;
              border:0px solid #fff;
              overflow:hidden;
              -webkit-box-shadow:0 0 3px #ccc;
              box-shadow:0 0 3px #ccc;
              border:2px solid white;
            }
          }
        }
      }
      .overlay-playing {
        position: absolute;
        top: 0;
        left: 0;
        color: #FFF;
      }
    }
  }

  /* 排队按钮 */
  .queue-button {
    margin-top: 10px;
    background-color: #4D2D05;
    color: #FFF;
    font-size: 1.5rem;
    border-radius: 1.5rem;
    width: 13rem;
    padding: 0.5rem;
  }
  /* 正在排队 */
  .queueing-button {
    margin-top: 10px;
    background-color: #FFF;
    color: #4D2D05;
    font-size: 1.5rem;
    border-radius: 1.5rem;
    width: 13rem;
    padding: 0.5rem;
  }
  /* 确认开始游戏按钮*/
  .confirm-button {
    margin-top: 10px;
    background-color: #FFF;
    color: #4D2D05;
    font-size: 1.5rem;
    border-radius: 1.5rem;
    width: 9rem;
    padding: 0.5rem;
  }
  /* 移动设备触摸板*/
  .operation-panel {
      /*display: none;*/
      position: relative;
      width: 360px;
      height: 180px;
      bottom: 10px;
/*      left: 55%;*/
      margin: 0 auto;
      user-select: none;
      background-color: none;
  }
  /* 控制上下左右*/
  .operation-arrow {
    position: relative;
    background-color: #FFF;
    width: 150px;
    height: 150px;
    border-radius: 150px;
    top: 10%;
  }
  .arrow-key {
      color: #fff;
      text-align: center;
      font-size: 48px;
      opacity: 0.7;
      border-radius: 20px;
      border-style:none;
  }

  .arrow-up {
      position: relative;
      top: 0%;
      left: 55%;
      margin-left: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border:0px;
      background-color:
      transparent;
      background-image:url(../assets/up.png);
      background-size: 50px;
  }

  .arrow-down {
      position: relative;
      bottom: -60%;
      left: 52%;
      margin-left: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border:0px;
      background-color:
      transparent;
      background-image:url(../assets/down.png);
      background-size: 50px;
  }

  .arrow-left {
      position: relative;
      left: -17%;
      top: 30%;
      margin-top: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border:0px;
      background-color:
      transparent;
      background-image:url(../assets/left.png);
      background-size: 50px;
  }

  .arrow-right {
      position: relative;
      right: -12%;
      top: 30%;
      margin-top: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border:0px;
      background-color:
      transparent;
      background-image:url(../assets/right.png);
      background-size: 50px;
  }

  .space {
      position: relative;
      right: -30%;
      top: -65px;
      margin-top: -50px;
      width: 100px;
      height: 100px;
      line-height: 100px;
      border:0px;
      background-color:
      transparent;
      background-image:url(../assets/catch_icon.png);
      background-size: 100px;
  }

  /* 详细信息*/
  .details {
    margin: 70px auto;
    width: 360px;
    .detail-nav {
      display: flex;
      justify-content: space-around;
      margin: 0;
      border-radius: 20px 20px 0 0;
      background-color: #FFF;
      button {
        border-style:none;
        padding: 1.5rem;
        background-color: #FFF;
        font-size: 1rem;
      }
    }
    img {
      width: 100%;
    }
  }
  /* 排行榜 */
  .rank {
    background: white;
    list-style: none;
    counter-reset: li;
    li::before {
      content: counter(li);
      color: #E2BE46;
      display: inline-block;
      width: 1em;
      margin-left: -1em
    }
    li {counter-increment: li}
    li {
      height: 40px;
      background: white;
      display: flex;
      justify-content: space-between;
      .rankAvater {
        height: 30px;
        width: auto;
        border-radius: 30px;
      }
      .count {
      }
    }
  }
}
</style>
