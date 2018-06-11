<template>
  <div class="my-doll-delivery">
    <p>申请发货</p>
    <div class="card-wrapper">
      <el-table
        :stripe="true"
        :data="userGifts"
        :border="false"
        :show-header="true"
        style="width: 100%"
        :empty-text="'空空如也，快去抓捕吧'"
        @selection-change="selected">
        <el-table-column type="selection" min-width="50" header-align="center">
        </el-table-column>
        <el-table-column label="商品图片" min-width="100" header-align="center">
          <template slot-scope="scope">
            <div style="margin-left: 0px">
              <img :src="baseURL + scope.row.AvatarUrl" style="height: 90px; margin: 0;" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品详情" min-width="170" header-align="center">
          <template slot-scope="scope">
            <div style="margin-left: 0px">
              <span style="font-size: 12px;padding-left: 0px;">{{scope.row.Name}}</span>
              <p style="font-size: 12px;padding-left: 0px;">{{utcTimeConvert(scope.row.ReceivedDT)}}</p>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-select v-model="address" clearable placeholder="请选择收货地址" style="margin-left: 10px;">
        <el-option
          v-for="item in options"
          :key="item.Id"
          :label="item.Street"
          :value="item.Id">
        </el-option>
      </el-select>
      <el-button type="info" style="float: right">{{"运费：" + moneyTotal + '币'}}</el-button>
      <br>
      <br>
      <!-- <el-button type="primary" @click="onSubmit" round>确认发货</el-button> -->
      <x-button type="primary" action-type="button" @click.native="onSubmit" style="background-color: #F7CB54; color: #AA852C; border: solid 1px #A8832A;">确认发货</x-button>
    </div>
  </div>
</template>
<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
import { XButton } from 'vux'
export default {
  components: {
    'app-footer': AppFooter,
    XButton
  },
  data () {
    return {
      userInfo: {balance: ''},
      userGifts: [],
      baseURL: 'https://www.liehuo55.com/',
      checked3: false,
      moneyTotal: 0,
      multipleSelection: [],
      options: [],
      address: '',
      balance: 0
    }
  },
  methods: {
    getUserInfo () {
      apiService.getUserBalance().then(data => {
        console.log('user balance info', data.data)
        this.userInfo.balance = data.data
      })
    },
    getUserGifts () {
      apiService.getUserGifts().then(data => {
        console.log('user gifts 1111', data.data.Gifts)
        // 把娃娃数据保存，如果Status == 1，放入可发货列表中
        this.userGifts = data.data.Gifts.filter(gift => gift.Status === 0)
      })
    },
    getPostage () { // 获取地址列表
      apiService.getAddressList().then(data => {
        console.log('address list get: ', data.data)
        this.options = data.data
        // 找出其中默认地址，把地址先设为该地址
        this.options.forEach(address => {
          if (address.IsDefault) {
            this.address = address.Id
          }
        })
      })
    },
    deliverGifts (json, address) {
      apiService.deliverGifts(json, address).then(data => {
        console.log('发货成功！')
        // 弹窗提示
        this.$alert('发货成功', '发货', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `玩家:${action}`
            })
          }
        })
        // 如果返回余额不足err，则提示用户余额不足
      })
    },
    onSubmit () {
      this.deliverGifts(this.multipleSelection, this.address)
      console.log('deliver data', this.multipleSelection)
      console.log('deliver address', this.address)
    },
    // 时间格式转换
    utcTimeConvert (time) {
      let date = new Date(time)
      let options = {
        // weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
      return date.toLocaleDateString('zh-cn', options)
      // return date
    },
    // 选中商品的函数,
    selected (selection) {
      this.multipleSelection = selection
      this.moneyTotal = 0
      apiService.getPostage(selection).then(data => {
        console.log('Postage', data)
        this.moneyTotal = data.data * 10
      })
      // 请求用户余额并存储在data中，用于比较
      apiService.getUserBalance().then(data => {
        console.log('balance: ', data)
        this.balance = data.data * 10
        // 判断是否足够余额，如果不够，提示充值
        console.log('余额', this.balance)
        console.log('运费', this.moneyTotal)
        if (this.balance <= this.moneyTotal) {
          console.log('余额不足')
          this.$message('余额不足请充值')
        }
      })
      // for (let i = 0; i < selection.length; i++) {
      //   // 判断是否是数字
      //   if (typeof selection[i].Qty === 'number') {
      //     selection[i].Qty = parseInt(selection[i].Qty)
      //   }
      //   this.moneyTotal += selection[i].Qty
      //   console.log('选中商品', this.multipleSelection)
      // }
    }
  },
  created () {
    this.getUserGifts()
    this.getPostage()
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style scoped lang="scss" type="text/css">
  .time {
    font-size: 12px;
  }
  .my-doll-delivery {
    display: block;
    background-color: #EEEEEE;
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: scroll;
    /*margin: 0 auto;*/
    .card-wrapper {
      position: relative;
      overflow-y: scroll;
      height: 600px;
      .el-card {
        margin-bottom: 10px;
      }
    }
  }
</style>
