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
            <span>{{totalCount}}</span>
            <br/>
            {{ '记录' }}
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
<!--     <div class="card" v-for="(o, index) in bills.Logs" :key="index" style="overflow-y: scroll;">
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
    </div> -->
    <scroller lock-x height="80%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <div class="card" v-for="(o, index) in bills.Logs" :key="index" style="overflow-y: scroll;">
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
        <load-more v-show="isLoadMore" tip="loading"></load-more>
      </div>
    </scroller>
  </div>
</template>
<script>
import apiService from '../API.service.js'
import { Card, Scroller, LoadMore } from 'vux'
export default {
  components: {
    Card,
    Scroller,
    LoadMore
  },
  data () {
    return {
      bills: {},
      userInfo: {balance: 100},
      totalCount: 0,
      offset: 0,
      isLoadMore: false
    }
  },
  props: [],
  computed: {
  },
  methods: {
    getBilling (isLoadMore, offset, pagecount) {
      apiService.getBilling(isLoadMore, offset, pagecount).then(data => {
        console.log('billing: ', data)
        this.bills = data.data
        console.log('this bills: ', this.bills)
        this.totalCount = data.data.TotalCount
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
    },
    onScrollBottom () {
      if (this.isLoadMore) {
      } else {
        this.isLoadMore = true
        this.offset += 5
        apiService.getBilling(this.isLoadMore, this.offset, 5).then(data => {
          console.log('loading more bill: ', data)
          this.bills.Logs = this.bills.Logs.concat(data.data.Logs)
          console.log('new bill list: ', this.bills.Logs)
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.isLoadMore = false
        }).catch(error => {
          console.log('get billing history error', error)
          this.isLoadMore = false
        })
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getBilling(true, 0, 5)
  }
}
</script>
<style scoped lang="scss" type="text/css">
body {
  background-color: #EEEEEE;
}
.bill-wrapper {
  background-color: #EEEEEE;
/*  height: 100%;*/
  display: block;
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
  .card:last-child { /* 防止最后一个被topbar遮住*/
    padding-bottom: 100px;
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
