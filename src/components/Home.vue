<template>
  <div>
    <app-header></app-header>
    <!-- <room></room> -->
    <category></category>
    <!-- <app-footer></app-footer> -->
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Room from './Room'
import Category from './Category'
import MQTT from '../MQTT.service.js'

export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'room': Room,
    'category': Category
  },
  name: 'Home',
  methods: {
    checkLogin () {
      let browser = {
        versions: function () {
          let u = navigator.userAgent
          // let app = navigator.appVersion
          return {// 移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, // IE内核
            presto: u.indexOf('Presto') > -1, // opera内核
            webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //  火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //  是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //  是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //  是否iPad
            webApp: u.indexOf('Safari') === -1 //  是否web应该程序，没有头部与底部
          }
        },
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
      }
      // 检查是否是微信浏览器
      if (browser.versions.mobile) {
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessageer/i) === 'micromessenger') {
          console.log('微信浏览器')
          this.$router.push('./login')
        }
      }
      // 检查是否存在session
      if (!this.getCookie('zhuawawa')) {
        // 如果没有登陆状态则跳转到登陆页
        console.log('no cookie found')
        this.$router.push('/Tulogin')
      } else {
        this.$router.push('/')
        // 如果有session把用户数据提取到state中
        let data = unescape(this.getCookie('zhuawawa'))
        // console.log('getCookie parse: ', JSON.parse(data))
        this.$store.dispatch('updataPlayerInfo', JSON.parse(data))
      }
    },
    // 游戏开始函数，连接MQTT，初始化Music
    onStart () {
      // 初始化，连接MQTT
      MQTT.initMqttClient()
    }
  },
  created () {
    this.onStart()
  },
  watch: {
    // 监听路由变化，检查登陆状态
    '$route': 'checkLogin'
  }
}
</script>
<style scoped lang="scss" type="text/css">

</style>
