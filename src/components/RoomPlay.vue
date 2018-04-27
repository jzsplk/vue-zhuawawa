<template>
  <div class="player-view">
    <p class="room-title">宫崎骏龙猫</p>
    <!-- 娃娃机画面 -->
    <div class="video-canvas"><canvas :id="videocanvas"></canvas></div>
    <!-- 控制面板 -->
    <div v-if="!isReady">
      <button @click="readyToPlay" class="queue-button">预约抓娃娃</button>
    </div>
    <div v-if="isReady" class="confirm">
      <button class="confirm-button">赶紧开始</button>
      <button class="confirm-button" @click="cancelToPlay">我放弃</button>
    </div>
    <div id="operation-panel" class="operation-panel" v-if="false">
        <button id="arrow-up" class="arrow-up arrow-key" @click="sendControlEvent(0, 100)">⇧</button>
        <button id="arrow-down" class="arrow-down arrow-key" @click="sendControlEvent(2, 100)">⇩</button>
        <button id="arrow-left" class="arrow-left arrow-key" @click="sendControlEvent(1, 100)">⇦</button>
        <button id="arrow-right" class="arrow-right arrow-key" @click="sendControlEvent(3, 100)">⇨</button>
        <button id="space" class="space arrow-key" @click="sendCmdGo()">⎋</button>
    </div>
    <!-- 详细信息 -->
    <div class="details">
        <p id="connectionStatus"></p>
        <button @click="initMqttClient">connect</button>
        <button @click="disconnect">disconnect</button>
        <button @click="subscribe('ctrl/22371')">subscribe</button>
        <button @click="publishTopic">publish</button>
        <button @click="sendReady">sendReady</button>
        <button @click="PrepareTopic">prepare</button>
        <button @click="playerStart">playerStart</button>
        <button @click="readyToPlay">queueToPlay</button>>
        <span v-if="isReady">State Ready</span>
        <img src="https://www.iqi1.com/uploads/301bbe4ae1dbf3e88a858c814fca07129cecbce5.jpg" alt="">
    </div>
  </div>
</template>

<script>
import playVideo from '../Video.service.js'
import MQTT from '../MQTT.service.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      baseURL: 'https://www.iqi1.com/',
      videocanvas: 'video-canvas'
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
      cancelToPlay: 'cancelToPlay'
    }),
    initMqttClient () {
      MQTT.initMqttClient()
      console.log(this.global.client)
      console.log(this.global.hostname)
      MQTT.parseMQTTResults()
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
    sendReady () {
      MQTT.sendReadyorPassCmd()
    },
    sendControlEvent (type, param) {
      MQTT.sendControlEvent(type, param)
    },
    sendCmdGo () {
      MQTT.sendControlCmd('go', 200, 2)
    },
    PrepareTopic () {
      MQTT.publishMessage({action: 'room_update'}, 0, 'notify/' + '22371')
    },
    playerStart () {
      MQTT.playStart()
    }
  },
  created () {
  },
  mounted () {
    playVideo.play()
    MQTT.initMqttClient()
    MQTT.say()
  },
  computed: {
    ...mapGetters(['isReady'])
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
  }
  /* 排队按钮 */
  .queue-button {
    margin-top: 20px;
    background-color: #4D2D05;
    color: #FFF;
    font-size: 1.5rem;
    border-radius: 1.5rem;
    width: 13rem;
    padding: 0.5rem;
  }
  /* 确认开始游戏按钮*/
  .confirm-button {
    margin-top: 20px;
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
      background-color: #20140A
  }

  .arrow-key {
      background-color: #24519d;
      color: #fff;
      text-align: center;
      font-size: 48px;
      opacity: 0.7;
      border-radius: 20px;
  }

  .arrow-up {
      position: relative;
      top: 10%;
      left: 25%;
      margin-left: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
  }

  .arrow-down {
      position: relative;
      bottom: -50%;
      left: 23%;
      margin-left: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
  }

  .arrow-left {
      position: relative;
      left: -5%;
      top: 30%;
      margin-top: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
  }

  .arrow-right {
      position: relative;
      left: 6%;
      top: 30%;
      margin-top: -50px;
      width: 50px;
      height: 50px;
      line-height: 50px;
  }

  .space {
      position: relative;
      right: -10%;
      top: 30%;
      margin-top: -50px;
      width: 100px;
      height: 100px;
      line-height: 100px;
  }

  /* 详细信息*/
  .details {
    margin: 0 auto;
    width: 360px;

    img {
      width: 100%;
    }
  }
}
</style>
