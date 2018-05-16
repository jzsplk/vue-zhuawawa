<template>
  <div class="UserInfo_wrapper">
    <div class="user_header">
      <div class="avatar">
        <img class="avatar-img" :src="$store.state.playerInfo.AvatarUrl" alt="">
      </div>
      <div class="name">{{$store.state.playerInfo.name}}
      </div>
      <div class="balance">
        <img src="../../static/pic/coin.png" alt=""> {{userInfo.balance * 10}} 币
      </div>
    </div>
    <div class="list">
      <el-button type="warning" @click="logout">退出登陆</el-button>
      <!-- <button @click="logout">退出登陆</button> -->
    </div>
    <div class="main">
    </div>
    <el-container>
      <el-header>
      </el-header>
      <el-main>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
    <app-footer></app-footer>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
export default {
  components: {
    'app-footer': AppFooter
  },
  data () {
    return {
      userInfo: {balance: ''}
    }
  },
  methods: {
    getUserInfo () {
      apiService.getUserBalance().then(data => {
        console.log('user balance info', data.data)
        this.userInfo.balance = data.data
      })
    },
    logout () {
      this.delCookie('zhuawawa')
      // 暂时不退出微信，等修复微信二次登陆问题
      this.delCookie('wxzhuawawa')
      // 跳转到主页
      // 清理有关微信登陆auth_code
      window.sessionStorage.removeItem('auth_code')
      // 清理微信登陆的token
      window.localStorage.removeItem('access_token')
      setTimeout(this.$router.push('./'), 2000)
    }
  },
  created () {
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="scss" type="text/css">
  .UserInfo_wrapper {
    .user_header {
      width: 750px;
      max-width: 100%;
      height: 500px;
      margin: 0 auto;
      background: url(../../static/pic/mine_header_bg.png) no-repeat;
      background-size: 100% 30%;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50px;
        margin: 0 auto;
        .avatar-img {
          width: 60px;
          height: 60px;
          border-radius: 50px;
          margin-top: 20px;
        }
      }
      .name {
        margin-top: 15px;
        font-size: 1.2rem;
      }
      .balance {
        box-sizing: border-box;
        display: inline-block;
        line-height: 2.3;
        border-radius: 1.5rem;
        max-width: 40%;
        padding: 0.2em 1.12em;
        background-color: #575757;
        opacity: 0.5;
        margin: 0 auto;
        color: #FFFFFF;
        font-size: 13px;
        img {
          height: 1rem;
          width: auto;
          vertical-align: middle;
        }
      }
    }
    // el-container 有问题，先不用
    .el-container {
      .el-header {
        text-align: center;
        width: 100%;
      }
    }
  }
</style>
