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
import _global from './Global'
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
    init () {
      this.goToUrl()
      let urlData = this.getUrlData(window.location.href)
      console.log('urlData', urlData)
      this.getPayList()
    },
    getPayList () { // 调用api的获取函数，获取商品列表，存储在goods中，获取payId信息，存在payId中
      apiService.getPayList().then(res => {
        this.goods = res.data
        this.payId.openid = res.openid
        this.payId.unionid = res.unionid
      })
    },
    goToUrl () {
      console.log('window.location.href')
      let uri = _global.url
      window.location.href = uri
    },
    getUrlData (href) {
      let json = {}
      let arr1 = href.split('?')
      if (arr1[1]) {
        let arr2 = arr1[1].split('&')
        for (let i = 0; i < arr2.length; i++) {
          let arr3 = arr2[i].split('=')
          json[arr3[0]] = arr3[1]
        }
        return json
      }
    }
  },
  created () {
    this.goToUrl()
    this.getPayList()
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
</style>
