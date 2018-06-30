<template>
  <div id="app" v-bind:class="{ enter: this.$store.state.isEntered || this.$store.state.isHome}">
<!--     <div class="header">
      <div class="logo">
        <router-link :to="{path: '/'}" ><img class="login-img" src="/static/pic/logo.png" @click="leaveRoom"></router-link>
      </div>
      <div class="login">
        <router-link to="/login"><button>X微信登陆</button></router-link>
        <router-link :to="{ path: '/Tulogin'}" append><button>登陆</button></router-link>
      </div>
    </div> -->
    <div class="header" v-bind:class="{ hide: this.$store.state.isEntered || this.$store.state.isHome}">
      <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">最爱抓娃娃</x-header>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu-menu1="showRecharge"></actionsheet>
    </div>
    <keep-alive :include="/Keep$/">
        <router-view/>
    </keep-alive>
    <div v-transfer-dom>
      <x-dialog v-model="showPunch" class="dialog-demo" hide-on-blur>
        <div class="img-box">
<!--           <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%"> -->
<!--         <img src="http://alicdn.gongyou.co/zhuaww/static/pic/logo.png" style="width: 150px;max-width:100%"> -->
        </div>
        <div class="content-box">
          <div class="overlay">
<!--             <img src="http://alicdn.gongyou.co/zhuaww/static/pic/icon_29pt@3x@2x.png" alt="" style="{width: 260px; height: 100px;}"> -->
          <img src="http://ddz5.zz.gongyou.co/h5/static/pic/icon_29pt@3x@2x.png" alt="" style="{width: 260px; height: 130px;}">
          </div>
          <div class="count1">
            每日签到赠送 10 娃娃币
          </div>
<!--           <div class="count">
            已签到{{Punched}}天
          </div>
          <div class="count">
            连续签到{{Continued}}天
          </div> -->
          <x-button type="primary" @click.native="Punch">签到</x-button>
        </div>
        <div @click="showPunch=false" class="close">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
<!--     <keep-alive exclude="WechatAuth">
      <router-view/>
    </keep-alive> -->
    <app-footer class="footer" :dolls="userGifts.length"></app-footer>
  </div>
</template>

<script>
import MQTT from './MQTT.service.js'
import AppFooter from './components/AppFooter'
import apiService from './API.service.js'
import { XHeader, TransferDom, Actionsheet, XDialog, XButton } from 'vux'
// import Punch from './components/Punch'
export default {
  name: 'App',
  directives: {
    TransferDom
  },
  components: {
    'app-footer': AppFooter,
    XHeader,
    Actionsheet,
    XDialog,
    XButton
  },
  data () {
    return {
      isPlaying: true,
      userGifts: [],
      showMenus: false,
      menus: {
        menu1: '微信充值'
        // menu2: '微信登陆'
      },
      isPunched: false,
      showPunch: false,
      Punched: 0,
      Continued: 0
    }
  },
  computed: {
  },
  watch: {// 监控路由变化，如果返回主页，执行checklogin,可能这里导致wechat登陆post发送了两次
    '$route' (to, from) {
      if (to.path === '/') {
        this.checkLogin()
      }
    }
  },
  methods: {
    closeZoom () {
      document.addEventListener('touchmove', function (event) {
        if (event.scale) {
          if (event.scale !== 1) {
            event.preventDefault()
          }
        }
      }, { passive: false })
    },
    leaveRoom () {
      MQTT.destoryMQTT()
    },
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
      if (browser.versions().mobile) {
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i)) {
          if (ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
            console.log('微信浏览器')
            console.log('cookie before check', this.getCookie('wxzhuawawa'))
            // if wechat broswer, check cookie fo wechat
            if (!this.getCookie('wxzhuawawa')) {
              // check localstorage of access_token
              console.log('localStorage now: ', window.localStorage.getItem('access_token'))
              // if no cookie but have localstorage
              // if no cookie and no localstorage
              console.log('no wx cookie found and localStorage,will jump to login')
              // 如果是微信浏览器，跳转微信登陆
              this.$router.push('./login')
            } else {
              // this.$router.push('/')
              // 如果有session把用户数据提取到state中2
              console.log('cookie after check', this.getCookie('wxzhuawawa'))
              let data = unescape(this.getCookie('wxzhuawawa'))
              console.log('getCookie parse: ', JSON.parse(data))
              // dispatch login state
              this.$store.dispatch('toggleLoginState')
              // update user data
              this.$store.dispatch('updataPlayerInfo', JSON.parse(data))
            }
          }
        } else {
          // 如果不是微信浏览器，游客登陆，检查是否存在session
          if (!this.getCookie('zhuawawa')) {
            // 如果没有登陆状态则跳转到登陆页
            console.log('no cookie found')
            this.$router.push('./Tulogin')
          } else {
            // this.$router.push('/')
            // 如果有session把用户数据提取到state中
            let data = unescape(this.getCookie('zhuawawa'))
            console.log('getCookie parse: ', JSON.parse(data))
            // dispatch login state
            this.$store.dispatch('toggleLoginState')
            // update user info
            this.$store.dispatch('updataPlayerInfo', JSON.parse(data))
          }
        }
      } else {
        // 检查是否存在session
        if (!this.getCookie('zhuawawa')) {
          // 如果没有登陆状态则跳转到登陆页
          console.log('no cookie found')
          this.$router.push('./Tulogin')
        } else {
          // this.$router.push('/')
          // 如果有session把用户数据提取到state中
          let data = unescape(this.getCookie('zhuawawa'))
          console.log('getCookie parse: ', JSON.parse(data))
          this.$store.dispatch('updataPlayerInfo', JSON.parse(data))
        }
      }
    },
    getUserGifts () {
      apiService.getUserGifts().then(data => {
        console.log('user gifts 1111', data.data.Gifts)
        // 把娃娃数据保存
        this.userGifts = data.data.Gifts
      })
    },
    showRecharge () {
      window.location.href = 'http://alicdn.gongyou.co/zhuaww/dist/'
    },
    checkPunchin () {
      apiService.getPunchin().then(data => {
        console.log('punchin data: ', data.data)
        if (data.data.Flag) {
          this.isPunched = false
          console.log('not punched yet ')
          // show the punchin window
          this.showPunch = true
          this.Punched = data.data.Punched
          this.Continued = data.data.Continued
        } else {
          this.isPunched = true
          console.log('is punch in ')
          this.Punched = data.data.Punched
          this.Continued = data.data.Continued
          // dont show the punchin window
        }
      })
    },
    Punch () { // request Punch in
      this.showPunch = false
      apiService.Punchin().then(data => {
        console.log('Punched info: ', data)
        this.$vux.toast.show({
          text: `已签到 得到 ${data.data * 10} 娃娃币`
        })
        this.Punched += 1
        this.Continued += 1
      })
        .catch(error => {
          console.log('punch error', error.response)
        })
    }
  },
  created () {
    // 执行checklogin
    this.checkLogin()
    this.closeZoom()
    // this.getUserGifts()
    // 阻止微信长按菜单出现
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
  },
  mounted () {
    /**
    * @description check if Punched
    * @constructor
    * @param {string} title - 书的标题
    * @param {string} author - 书的作者
    */
    this.checkPunchin()
    document.getElementById('app').scrollIntoView()
  }
}
</script>
<style lang="scss" type="text/css">
/*@import '~vux/src/styles/reset.less';*/
/* 去掉默认body的margin*/
body { margin: 0;}
/* 修改el-message-box 默认样式*/
.el-message-box {
  max-width: 100%;
  font-size: 13px;
  margin-top: 200px;
}
.el-message {
  min-width: 320px;
  max-width: 100%;
  font-size: 13px;
  margin-top: 50px;
}
.hide { /* hide header when enter roomplay */
  display: none !important;
  height: 0;
}
/* may cause the scoll top error */
.enter {  /* change margin top of app when enter roomplay */
  margin-top: 0px !important;;
}
.close {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #FFFFFF;
  width: 40px;
  height: 40px;
  border-radius: 40px;
}
#app {
  font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /* 解决左右轻微拖动问题 */
  overflow-x:hidden;
  /* 解决app留白问题*/
  padding:0px;
  margin:0px;
  position:absolute;
  top:0px;
  left:0px;
  width: 100%;
/*  height: 100%;*/
  /* this will cause scroll Top error*/
/*  width:100%;
  height:100%;*/
  border:hidden;
  overflow: scroll;
  margin-top: 40px;
  body {
    /* 去掉margin*/
    /* 禁止微信内置浏览器调整字体大小 */
    -webkit-text-size-adjust: 100% !important;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none; /* 禁止用户选中文字 */
    height: 100%;
  }
  button {
    /*border-width: 0;*/
  }
  img, embed, object, video, canvas {
    max-width: 100%;
  }
  nav a {
    padding: 1.5em;
  }
  nav a, button {
    min-width: 48px;
    /* 去掉点击时边框 */
    outline: none;
  }
  img {
    /* 在iphone关闭长按图片保存图片弹窗 */
    -webkit-touch-callout: none;
  }
  a:-webkit-any-link {
    /* 去掉a tag的下划线*/
      color: -webkit-link;
      cursor: pointer;
      text-decoration: none;
  }
}
.header {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2004;
}
.header1 {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: #E9DF38;
  width: 100%;
  height: 100px;
  .logo {
    .login-img {
      width: 90px;
    }
    .login-img:hover {
      background-color: white;
    }
  }
  .login {
    margin-left: 0.5rem;
    button {
      border-style:none;
      padding: 0.5rem;
      background-color: #E9DF38;
      font-size: 0.8rem;
      font-size: 1rem;
    }
    button:hover {
      background-color: #FFF;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
}
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(blue, A200), // The primary color of your application
  accent: md-get-palette-color(red, A200) // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme
.img-box {
  height: 150px;
  overflow: hidden;
}
.content-box {
  position: relative;
  height: 160px;
  .overlay {
    position: absolute;
    top: -100px;
    left: 29%;
    z-index: 999;
  }
  .count1 {
    padding-top: 60px;
    margin-bottom: 40px;
    font-size: 1.2rem;
  }
  .count {
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
</style>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/close';

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>
