<template>
  <div class="UserInfo_wrapper">
    <el-container>
      <el-header>
        <div class="user_header">
          <div class="avter">
            <img src="" alt="">
          </div>
          <div>Name: </div>
          <div>余额:{{userInfo.balance}}</div>
        </div>
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import apiService from '../API.service.js'
export default {
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
  .user_header {
    width: 100%;
    height: 500px;
    background: url(../../static/pic/mine_header_bg.png) no-repeat;
    background-size: 100% 30%;

  }
</style>
