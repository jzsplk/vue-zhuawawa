<template>
  <div class="Pay-item-wrapper">
<!--     <md-card class="md-primary">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">微信充值</div>
          <div class="md-subhead">{{good.price}}币</div>
        </md-card-header-text>

        <md-card-media>
          <img src="../../static/pic/coin.png" alt="Avatar">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button @click="sendPay(good, id)">充值</md-button>
      </md-card-actions>
    </md-card> -->
    <el-card>
      <div class="md-title">微信充值</div>
      <div class="md-subhead">{{good.price}}币</div>
      <img src="../../static/pic/coin.png" alt="Avatar">
      <el-button @click="sendPay(good, id)">充值</el-button>
    </el-card>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import WePay from '../WePay.service.js'
import store from '../vuex/index.js'
export default {
  components: {
  },
  data () {
    return {
      userInfo: ''
    }
  },
  props: ['good', 'id'],
  methods: {
    sendPay (good, id) {
      let jsonData = {}
      jsonData.detail = good[0]
      jsonData.quantity = good[1]
      jsonData.price = good[2]
      jsonData.price_cent = good[3]
      jsonData.proc_id = good[4]
      jsonData.openid = id.openid
      jsonData.unionid = id.unionid
      jsonData.account = store._vm.token // 原来这里取一个account，这里是否继续用？目前是用token
      jsonData.code = good[5]
      // 根据取回数据组成jsonData,发起requestWePay请求，如果sucess，则发起WePay请求
      apiService.requestWePay(jsonData).then(res => {
        WePay.play(res)
      })
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
</style>
