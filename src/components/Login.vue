<template>
  <div class="login">
    <!-- <router-link to="/login"><button>微信登陆</button></router-link> -->
    <div class="login-wrapper">
      <div class="login_logo">
        <img src="../../static/pic/icon.png" alt="">
      </div>
      <!-- <input type="text" v-model="TouristInput" placeholder="请输入您的名字"> -->
      <!-- <button @click="login(UserUUID)">游客登陆</button> -->
      <el-button type="primary" round @click="login(UserUUID)">游客登陆</el-button>
      <!-- <el-button type="primary" round @click="$router.push('./login')">微信登陆</el-button> -->
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
  created () {
    this.getUUid()
  },
  methods: {
    getUUid () {
      // 先执行footprint 函数，取得用户device fingerprint
      let _this = this
      new Fingerprint2().get(function (result, components) {
        console.log('User UUid: ', result)
        let subUUid = result.substring(0, 12)
        console.log('sub UUid: ', subUUid)
        _this.UserUUID = subUUid
        console.log('new UUid', _this.UserUUID)
      })
    },
    login (name) {
      // 执行post登陆请求
      // UserInfo.Login()
      console.log('input', this.TouristInput)
      apiService.login(name).then(data => {
        console.log('游客信息', data)
        // 存储得到的数据
        let userData = {
          playerId: data.Id,
          token: data.Token,
          AvatarUrl: data.AvatarUrl,
          name: data.FirstName
        }
        // 存储游客信息到UserInfo
        UserInfo.getInfo(data.Id, data.Token)
        // 触发action，把id， token更新到state
        this.$store.dispatch('updataPlayerInfo', userData)
        let jsonUserData = JSON.stringify(userData)
        let expireDays = 1000 * 60 * 60 * 24 * 15
        this.setCookie('zhuawawa', jsonUserData, expireDays)
        // dispatch login state
        this.$store.dispatch('toggleLoginState')
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
      .login_logo {
        width: 300px;
        max-width: 80%;
        margin: 0 auto;
        margin-top: 3rem;
        text-align: center;
      }
      button {
        display: block;
        // font-size: 1.5rem;
        // border-radius: 3px;
        // background-color: #4B2A0C;
        // display: block;
        margin: 20px auto;
        // width: 50%;
        // color: #FFF;
        // padding: 20px;
        // box-sizing: border-box;
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
