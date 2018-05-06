<template>
  <div class="login">
    <!-- <router-link to="/login"><button>微信登陆</button></router-link> -->
    <div class="login-wrapper">
      <img src="../../static/pic/icon.png" alt="">
      <input type="text" v-model="TouristInput" placeholder="请输入您的名字">
      <button @click="login(UserUUID)">游客登陆</button>
    </div>

  </div>
</template>
<script>
import UserInfo from '../Login.service.js'
import apiService from '../API.service.js'
export default {
  data () {
    return {
      TouristInput: '',
      UserUUID: ''
    }
  },
  components: {
  },
  methods: {
    login (name) {
      // 先执行footprint 函数，取得用户device fingerprint
      new Fingerprint2().get(function (result, components) {
        console.log('User UUid: ', result)
        this.UserUUID = result
      })
      // 执行post登陆请求
      // UserInfo.Login()
      console.log('input', this.TouristInput)
      apiService.login(name).then(data => {
        console.log('游客信息', data)
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
    .login-wrapper {
      padding-top: 10%;
      width: 100%;
      margin: 0 auto;
      button {
        font-size: 1.5rem;
        border-radius: 3px;
        background-color: #4B2A0C;
        display: block;
        margin: 20px auto;
        width: 50%;
        color: #FFF;
        padding: 20px;
        box-sizing: border-box;
      }
      input {
        font-size: 1.5rem;
        background-color: #DAD7C2;
        border: 10px;
        margin: 20px;
        display: block;
        margin: 20px auto;
        width: 50%;
        padding: 20px;
        box-sizing: border-box;
      }
      img {
        width: 50%
      }
    }
  }
</style>
