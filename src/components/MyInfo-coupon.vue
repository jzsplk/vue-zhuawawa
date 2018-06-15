<template>
<div class="coupon">
<!--   <group title="兑换码">
    <x-input title="兑换码" type="number" placeholder="请输入兑换码" v-model="coupon">
      <img slot="right-full-height" src="https://ws1.sinaimg.cn/large/663d3650gy1fq684go3glj203m01hmwy.jpg">
    </x-input>
    <x-input title="发送兑换码" class="weui-vcode" type="number" placeholder="请输入兑换码" v-model="coupon">
      <x-button slot="right" type="primary" mini>发送兑换码</x-button>
    </x-input>
  </group> -->
  <group title="兑换码">
    <x-input label-width="4em" :title='`<span style="color:red;">兑换码</span>`' type="number" placeholder="请输入兑换码" v-model="coupon"></x-input>
  </group>
  <div style="padding:15px;">
    <x-button @click.native="postCoupon(coupon)" type="primary">
      <spinner :type="'android'" :size="'40px'" v-show="isLoading"></spinner>
    发送兑换码
  </x-button>
  </div>
</div>
</template>
<script>
import { Group, Cell, CellBox, XInput, XButton, Spinner } from 'vux'
import apiService from '../API.service.js'
export default {
  data () {
    return {
      coupon: '',
      isLoading: false
    }
  },
  components: {
    Group,
    Cell,
    CellBox,
    XInput,
    XButton,
    Spinner
  },
  methods: {
    postCoupon (coupon) {
      this.isLoading = true
      apiService.postCoupon(coupon).then(data => {
        console.log('user coupon posted', data.data)
        // 增加成功抓到的弹窗
        this.isLoading = false
        if (data.data.status === '该优惠券可兑换') {
          window.$vm.$message({
            message: data.data.result,
            type: 'success'
          })
        } else {
          if (data.data.status === 'EInvalidArg') {
            window.$vm.$message({
              message: '可惜 ' + '兑换码无效'
            })
          }
        }
      })
    }
  },
  mounted () {
  }
}
</script>
<style  scoped lang="scss" type="text/css">
.coupon {
  text-align: left;
  .header {
    margin-bottom: 30px;
  }
  .code {
    margin: 0 auto;
    width: 320px;
    max-width: 50%;
  }
  .info {
    max-width: 80%;
    margin: 0 auto;
    .import {
      color: #E18745;
    }
  }
}
</style>
