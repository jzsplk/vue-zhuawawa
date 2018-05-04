<template>
  <div class="login">
    <router-link to="/login"><button>微信登陆</button></router-link>
    <button @click="login">游客登陆</button>
  </div>
</template>
<script>
import UserInfo from '../Login.service.js'
import apiService from '../API.service.js'
export default {
  components: {
  },
  methods: {
    login () {
      // 执行post登陆请求
      // UserInfo.Login()
      apiService.login().then(data => {
        // 存储得到的数据
        let userData = {
          playerId: data.Id,
          token: data.Token
        }
        // 存储游客信息到UserInfo
        UserInfo.getInfo(data.Id, data.Token)
        // 触发action，把id， token更新到state
        this.$store.dispatch('updataPlayerInfo', userData)
        let jsonUserData = JSON.stringify(userData)
        let expireDays = 1000 * 60 * 60 * 24 * 15
        this.setCookie('zhuawawa', jsonUserData, expireDays)
        this.$router.push('/')
      })
    }
  },
  name: 'Login'
}
</script>
<style scoped lang="scss" type="text/css">
  .login {
    button {
      font-size: 3rem;
    }
  }
</style>
