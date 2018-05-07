<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <router-link :to="{path: '/'}" ><img class="login-img" src="/static/pic/logo.png" @click="leaveRoom"></router-link>
      </div>
      <div class="login">
        <router-link to="/login"><button>微信登陆</button></router-link>
        <router-link :to="{ path: '/Tulogin'}" append><button>登陆</button></router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import MQTT from './MQTT.service.js'
export default {
  name: 'App',
  methods: {
    leaveRoom () {
      MQTT.destoryMQTT()
    },
    checkLogin () {
      // 检查是否存在session
      if (!this.getCookie('zhuawawa')) {
        // 如果没有登陆状态则跳转到登陆页
        console.log('no cookie found')
        this.$router.push('/Tulogin')
      } else {
        // this.$router.push('/')
        // 如果有session把用户数据提取到state中
        let data = unescape(this.getCookie('zhuawawa'))
        console.log('getCookie parse: ', JSON.parse(data))
        this.$store.dispatch('updataPlayerInfo', JSON.parse(data))
      }
    }
  },
  created () {
    // 执行checklogin
    this.checkLogin()
  }
}
</script>

<style lang="scss" type="text/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
.header {
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
    margin-left: 50px;
    button {
      border-style:none;
      padding: 0.8rem;
      background-color: #E9DF38;
      font-size: 1rem;
      font-size: 20px;
    }
    button:hover {
      background-color: #FFF;
    }
  }

}
</style>
