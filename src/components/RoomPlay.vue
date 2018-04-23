<template>
  <div class="player-view">
    <!-- 娃娃机画面 -->
    <div class="video-canvas"><canvas :id="videocanvas"></canvas></div>
    <!-- 控制面板 -->
    <div id="operation-panel" class="operation-panel">
        <button id="arrow-up" class="arrow-up arrow-key">⇧</button>
        <button id="arrow-down" class="arrow-down arrow-key">⇩</button>
        <button id="arrow-left" class="arrow-left arrow-key">⇦</button>
        <button id="arrow-right" class="arrow-right arrow-key">⇨</button>
        <button id="space" class="space arrow-key">⎋</button>
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
import MQTT from '../MQTT.service.js'
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
  },
  created () {
  },
  mounted () {
    playVideo.play()
    MQTT.connect()
    MQTT.initMQTTClient()
  }
}
</script>

<style scoped lang="scss" type="text/css">
.player-view {
  .video-canvas {
    position: relative;
    width: 500px;
    margin: 0 auto;

    canvas {
      width: 360px;
      display: block;
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
