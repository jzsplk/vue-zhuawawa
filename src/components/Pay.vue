<template>
  <div class="Pay-wrapper">
    付款页面
    <div v-for="(good, index) in goods" :key="index">
      <pay-item :good="good" :id="payId"> </pay-item>
    </div>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import PayItem from './Pay-Item'
export default {
  components: {
    'pay-item': PayItem
  },
  data () {
    return {
      goods: [],
      payId: {}
    }
  },
  methods: {
    getPayList () { // 调用api的获取函数，获取商品列表，存储在goods中，获取payId信息，存在payId中
      apiService.getPayList().then(res => {
        this.goods = res.data
        this.payId.openid = res.openid
        this.payId.unionid = res.unionid
      })
    }
  },
  created () {
    this.getPayList()
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
</style>
