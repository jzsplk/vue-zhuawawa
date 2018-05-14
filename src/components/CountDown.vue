<template>
  <div>
    <span>{{time}}</span>
  </div>
</template>
<script>
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
      return this.$store.state.isCountDown
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
          this.$store.dispatch('stopCatching')
          this.time = this.rTime
          clearInterval(time)
        }
        if (this.$store.state.roomState !== 'Prepared') { // 当用户不在准备状态后，清除setInterval还原状态
          clearInterval(time)
          console.log('countdown this: ', this)
          this.$store.dispatch('resetCountDown')
        }
      }, 1000)
    }
  }
}
</script>
<style>
</style>
