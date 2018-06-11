<template>
<div class="feedback">
<!--   <div class="nav">
      问题反馈
  </div> -->
<!--   <divider>{{ '问题反馈' }}</divider> -->
  <h3 class="content">最爱抓娃娃</h3>
  <div class="code">
    <!-- <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode> -->
    <img src="../../static/qrcode.jpg" alt="" class="qrcode">
  </div>
  <br>
  <br>
  <p class="info">请微信扫描上方二维码，或微信搜索<span class="import">"最爱玩"</span>公众号关注，留言后客服会尽快响应您的问题</p>
<!--   <span>{{ 'current url' }}: {{value}}</span>
  <br>!
  <span>{{ 'current fgColor' }}: {{fgColor}}</span> -->
</div>
</template>
<script>
import { Qrcode, Divider } from 'vux'
export default {
  data () {
    return {
      value: 'https://vux.li',
      fgColor: '#000000'
    }
  },
  components: {
    Qrcode,
    Divider
  },
  methods: {
    next () { // 下一步
      if (this.active++ > 4) {
        this.active = 0
      }
    },
    showGuide () { // 增加一个帮助界面
    }
  },
  mounted () {
    setInterval(() => {
      this.value = `https://vux.li?t=${Math.random()}`
      this.fgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }, 1000)
  }
}
</script>
<style  scoped lang="scss" type="text/css">
.feedback {
  text-align: center;
  .content {
    margin-top: 90px;
  }
  .code {
    margin: 0 auto;
    width: 320px;
    max-width: 50%;
  }
  .info {
    max-width: 80%;
    margin: 0 auto;
    .import {
      color: #E18745;
    }
  }
}
</style>
