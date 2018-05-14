<template>
<div>
<!--   <el-button type="primary" round @click="$router.push('./login')">微信登陆</el-button>
  <el-button type="primary" round @click="WechatLogin">测试登陆</el-button> -->
  <div class="nav">
    <!-- <i class="el-icon-loading"></i> -->首页
  </div>
  <img class="head-img" src="../../static/pic/guide.png" alt="claw-game">
</div>
</template>
<script>
import apiService from '../API.service.js'
export default {
  methods: {
    WechatLogin () {
      apiService.WechatLogin()
    }
  }
}
</script>
<style  scoped lang="scss" type="text/css">
div {
  background-color: #FFFFFF;
  color: #FFF;
}
.nav{
  font-size: 1.5rem;
  background-color: #F3FF3D;
  color: #000;
}
.head-img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
