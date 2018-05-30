<template>
  <div class="countdown-wrapper">
    <div class="circle">
      <el-progress type="circle" :percentage="parseInt(time / this.rTime * 100)" color="#8e71c7" :width="40" :show-text="false"></el-progress>
    </div>
    <div class="number">
      <span>{{time}}</span>
    </div>
  </div>
</template>
<script>
// import MQTT from '../MQTT.service.js'
export default {
  data () {
    return {
      time: this.rTime
    }
  },
  props: ['rTime'],
  watch: {
    getCountDownStart (value, oldvalue) {
      if (value === true) {
        this.countDown()
      }
    }
  },
  computed: {
    getCountDownStart () {
      return this.$store.state.isPlayingCountDown
    }
  },
  methods: {
    countDown () {
      this.time = this.rTime
      // 倒计时
      let time = setInterval(() => {
        this.time--
        // 倒计时事件到，或者用户点击开始玩或者取消
        if (this.time === 0) {
          // 发下抓命令
          console.log('下抓')
          this.$emit('sendGo')
          // MQTT.sendControlCmd('go', 200, 2, 'ctrl/' + this.$store.state.roomPlayers.DeviceId)
          // // 增加一个提示玩家正在等待结果提示
          // this.$notify({
          //   title: '已下爪',
          //   message: '请等待结果揭晓',
          //   type: 'success',
          //   duration: 3000
          // })
          this.$store.dispatch('resetPlayingCountDown')
          this.time = this.rTime
          clearInterval(time)
        }
        if (this.$store.state.roomState !== 'Catching') { // 当用户不在准备状态后，清除setInterval还原状态
          clearInterval(time)
          console.log('playing countdown this: ', this)
          this.$store.dispatch('resetPlayingCountDown')
        }
      }, 1000)
    }
  }
}
</script>
<style scoped lang="scss" type="text/css">
.countdown-wrapper {
  position: relative;
  .circle {
    position: relative;
  }
  .number {
    position: absolute;
    top: 20%;
    left: 30%;
    color: #FFFFFF;
    font-size: 1rem;
  }
}
</style>
