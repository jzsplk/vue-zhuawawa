<template>
  <div class="UserInfo_wrapper">
    <div class="user_header">
      <div class="avatar">
        <img class="avatar-img" :src="$store.state.playerInfo.AvatarUrl" alt="">
      </div>
      <div class="name">{{$store.state.playerInfo.name}}
      </div>
      <div class="balance">
        <img src="../../static/pic/coin.png" alt=""> {{userInfo.balance}} CP
      </div>
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
      width: 100%;
      height: 500px;
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
