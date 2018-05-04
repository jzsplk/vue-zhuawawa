<template>
  <div class="login">
    <router-link to="/login"><button>微信登陆</button></router-link>
    <div>
      <input type="text" v-model="TouristInput" placeholder="请输入您的名字">
    </div>
    <button @click="login(TouristInput)">游客登陆</button>
  </div>
</template>
<script>
import UserInfo from '../Login.service.js'
import apiService from '../API.service.js'
export default {
  data () {
    return {
      TouristInput: ''
    }
  },
  components: {
  },
  methods: {
    login (name) {
      // 执行post登陆请求
      // UserInfo.Login()
      console.log('input', this.input)
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
    background-color: #DBC700;
    button {
      font-size: 3rem;
    }
  }
</style>
