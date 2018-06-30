<template>
  <div class="room">
    <div class="wrapper">
      排行榜
    </div>
    <emotion>微笑</emotion>
  </div>
</template>

<script>
import { WechatEmotion as Emotion } from 'vux'
export default {
  components: {
    Emotion
  },
  data () {
    return {
      baseURL: 'https://www.liehuo55.com/'
      // baseURL: 'http://139.199.227.21/'
      // baseURL: 'http://zhuaww.gongyou.co/weixin/'
    }
  },
  props: ['rank'],
  methods: {
  }
}
</script>

<style scoped lang="scss" type="text/css">
.room {
  display: block;
}
</style>