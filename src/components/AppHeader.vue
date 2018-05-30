<template>
<div>
<!--   <el-button type="primary" round @click="$router.push('./login')">微信登陆</el-button>
  <el-button type="primary" round @click="WechatLogin">测试登陆</el-button> -->
  <div class="nav">
    <!-- <i class="el-icon-loading"></i> <-->
      首页
    <!-- <el-button v-effect="yellow">test</el-button> -->
  </div>
  <div class="head">
    <img class="head-img" src="../../static/pic/guide.png" alt="claw-game" @click="showGuide">
  </div>
</div>
</template>
<script>
import apiService from '../API.service.js'
export default {
  methods: {
    WechatLogin () {
      apiService.WechatLogin()
    },
    picLoading () {
      const loading = this.$loading({
        lock: true,
        text: '建设中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
        target: document.querySelector('.head')
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    },
    showGuide () { // 增加一个帮助界面
      this.$router.push('./guide')
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
  background: linear-gradient(to right, #F8E354, #DCBD3B);
  color: linear-gradient(to right, #FEFEFE, #000000);
  width: 750px;
  max-width: 100%;
  margin: 0 auto;
  line-height: 1.4;
}
.head-img {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
