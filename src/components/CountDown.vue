<template>
  <div>
    <span>倒计时： {{cTime}}</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cTime: this.rTime
    }
  },
  props: ['rTime'],
  methods: {
    startCount () {
      let that = this
      let cTime = that.cTime
      // 倒计时
      let interval = window.setInterval(() => {
        if (--that.cTime <= 0) {
          // 倒计时接触后触发事件
          that.cTime = cTime
          window.clearInterval(interval)
        }
      }, 1000)
    }
  },
  mounted () {
    this.startCount()
  }
}
</script>
<style>
</style>
