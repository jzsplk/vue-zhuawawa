<template>
  <div id="app">
    <div class="header">
      <div class="logo">
        <router-link to="/"><img class="login-img" src="./assets/logo.png" @click="leaveRoom"></router-link>
      </div>
      <div class="login">
        <router-link to="/login"><button>微信登陆</button></router-link>
        <button @click="login">游客登陆</button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import UserInfo from './Login.service.js'
import MQTT from './MQTT.service.js'
export default {
  name: 'App',
  methods: {
    login () {
      UserInfo.Login()
    },
    leaveRoom () {
      MQTT.destoryMQTT()
    }
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
  }
  .login {
    margin-left: 50px;
    button {
      font-size: 20px;
    }
  }

}
</style>
