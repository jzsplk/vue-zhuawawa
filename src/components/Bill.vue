<template>
  <div class="bill-wrapper">
    <div class="wallet">
      <card :header="{title: '我的钱包'}">
        <div slot="content" class="card-demo-flex card-demo-content01">
          <div class="vux-1px-r">
            <span>{{userInfo.balance * 10}}</span>
            <br/>
            {{ '娃娃币' }}
          </div>
          <div class="vux-1px-r">
            <span>{{bills.Logs.length}}</span>
            <br/>
            {{ '积分' }}
          </div>
          <div class="vux-1px-r">
            <span>0</span>
            <br/>
            {{ '娃娃' }}
          </div>
<!--           <div>
            <span>88</span>
            <br/>
            {{ $t('Cash') }}
          </div> -->
        </div>
      </card>
    </div>
    <div class="card" v-for="(o, index) in bills.Logs" :key="index">
      <el-card class="box-card" bodyStyle="display: flex;width: 100%;align-items:center;">
        <div class="info">
          <div  class="text item">
            {{ o.Memo }}
          </div>
          <div  class="text item">
            {{ utcTimeConvert(o.Timestamp) }}
          </div>
        </div>
        <div class="cost">
          <div v-show="o.Amount < 0" class="lose">
            <span>{{ o.Amount*10 + '币'}}</span>
          </div>
          <div v-show="o.Amount === 0" class="lose">
            <span>-{{ o.Amount*10 + '币'}}</span>
          </div>
          <div v-show="o.Amount > 0" class="get">
            <span>+{{ o.Amount*10 + '币'}}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import apiService from '../API.service.js'
import { Card } from 'vux'
export default {
  components: {
    Card
  },
  data () {
    return {
      bills: {},
      userInfo: {balance: 100}
    }
  },
  props: [],
  computed: {
  },
  methods: {
    getBilling () {
      apiService.getBilling().then(data => {
        console.log('billing: ', data)
        this.bills = data.data
      })
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
    getUserInfo () {
      apiService.getUserBalance().then(data => {
        console.log('user balance info', data.data)
        this.userInfo.balance = data.data
      })
    }
  },
  created () {
    this.getUserInfo()
    this.getBilling()
  }
}
</script>
<style scoped lang="scss" type="text/css">
.bill-wrapper {
  padding-bottom: 60px;
  .head {
    background-color: #edc83a;
  }
  .card {
    overflow-y: scroll;
    .box-card {
      margin-bottom: 10px;
      display: flex;
      flex-wrap: nowrap;
      width: 100%;
      .info {
        display: block;
        flex-grow: 0;
        width: 250px;
        max-width: 80%;
        /*background:red;*/
      }
      .cost {
        display: block;
        margin-right: 0px;
        flex-grow: 2;
        text-align: right;
        /*background:yellowgreen;*/
        width: auto;
        min-width: 50px;
        .lose {
          color: red;
        }
        .get {
          color: green;
        }
      }
    }
  }
}
</style>
<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
</style>
