<template>
  <span>倒计时： {{rTime}}</span>
</template>
<script>
export default {
  data () {
    return {
      rTime: 6
    }
  },
  props: ['cTime'],
  methods: {
    startCount () {
      let that = this
      let rTime = that.rTime
      // 倒计时
      let interval = window.setInterval(() => {
        if (--that.rTime <= 0) {
          // 倒计时接触后触发事件
          that.rTime = rTime
          window.clearInterval(interval)
        }
      }, 1000)
    }
  }
}
</script>
<style>
</style>
