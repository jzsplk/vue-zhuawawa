<template>
  <div class="UserInfo_wrapper">
    <div class="user_header">
      <div class="avter">
        <img src="" alt="">
      </div>
      <div>Name: </div>
      <div>余额:{{userInfo.balance}}</div>
    </div>
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

</style>
