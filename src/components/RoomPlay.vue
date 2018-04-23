<template>
  <div class="player-view">
    <!-- 娃娃机画面 -->
    <div class="video-canvas"><canvas :id="videocanvas"></canvas></div>
    <!-- 控制面板 -->
    <div id="operation-panel" class="operation-panel">
        <button id="arrow-up" class="arrow-up arrow-key" @click="publish1">⇧</button>
        <button id="arrow-down" class="arrow-down arrow-key" @click="publish2">⇩</button>
        <button id="arrow-left" class="arrow-left arrow-key" @click="publish3">⇦</button>
        <button id="arrow-right" class="arrow-right arrow-key" @click="publish4">⇨</button>
        <button id="space" class="space arrow-key" @click="publish5">⎋</button>
    </div>
    <!-- 详细信息 -->
    <div class="details">
        <p id="connectionStatus"></p>
        <img src="https://www.iqi1.com/uploads/301bbe4ae1dbf3e88a858c814fca07129cecbce5.jpg" alt="">
    </div>
  </div>
</template>

<script>
import playVideo from '../Video.service.js'
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
    publish1 () {
      this.$mqtt.publish('VueMqtt/publish1', 'message to Sub1')
      console.log('up')
    },
    publish2 () {
      this.$mqtt.publish('VueMqtt/publish2', 'message to Sub2')
      console.log('down')
    },
    publish3 () {
      this.$mqtt.publish('VueMqtt/publish3', 'message to Sub3')
      console.log('left')
    },
    publish4 () {
      this.$mqtt.publish('VueMqtt/publish4', 'message to Sub4')
      console.log('right')
    },
    publish5 () {
      this.$mqtt.publish('VueMqtt/publish5', 'message to Sub5')
      console.log('go')
    }
  },
  created () {
  },
  mounted () {
    playVideo.play()
    this.$mqtt.subscribe('VueMqtt/#')
  },
  mqtt: {
    'VueMqtt/publish1' (topic, data) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    },
    'VueMqtt/publish2' (topic, data) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    },
    'VueMqtt/publish3' (topic, data) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    },
    'VueMqtt/publish4' (topic, data) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    },
    'VueMqtt/publish5' (topic, data) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.player-view {
  display: block;
  .video-canvas {
    width: 360px;
    margin: 0 auto;
    canvas {
      display: block;
      width: 360px;
    }
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
