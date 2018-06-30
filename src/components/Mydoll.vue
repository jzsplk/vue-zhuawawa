<template>
  <div class="my-doll">
<!--     <span>我的娃娃</span> -->
    <div class="card-wrapper">
<!--       <el-row>
        <el-col :span="10" v-for="(o, index) in userGifts" :key="index" :offset="index % 2 !== 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="baseURL + o.AvatarUrl" class="image">
            <div style="padding: 14px;">
              <span>{{o.Name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{utcTimeConvert(o.ReceivedDT)}}</time>
                <el-button style="float: right;" type="text" v-bind:class="{ active: o.Status === 1 }">{{o.Status === 0 ? '可兑换' : '已发货'}}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row> -->
<!--       <div class="panel-wrapper">
        <panel :header="'我的娃娃'" :list="list" :type="'5'"></panel>
      </div> -->
      <group-title> {{ '我的娃娃' }} </group-title>
      <div class="no-doll" v-if="list.length === 0">
        <img src="../../static/pic/crying1.png" alt="" style="width: 50%;">
        <p style="width: 70%;margin: 0 auto;">暂时还没有娃娃，快去抓捕吧！</p>
      </div>
      <scroller lock-x height="80%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="grid-wrapper">
          <grid :show-vertical-dividers="false" v-for="li in list" :key="li.Id" style="display: flex; align-items: center; border-radius: 10px;margin: 10px 5px;">
            <grid-item style="padding: 0; width: 25%;">
              <img class="grid-center" :src="li.src" style="width:100%;">
            </grid-item>
            <grid-item style="flex-grow: 1;text-align: left;border-bottom: none;padding: 20px 20px;">
              <span class="grid-center" style="text-align: left;color: #444444">{{li.Name}}</span>
              <span class="grid-date" style="text-align: left;color: #969696">{{li.desc}}</span>
            </grid-item>
            <grid-item style="flex-grow: 0;width: 20%;">
              <span v-show="li.Status === 0" class="grid-center" >可兑换</span>
              <span v-show="li.Status === 1" class="grid-center" >已申请发货</span>
              <span v-show="li.Status === 2" class="grid-center" >已发货</span>
            </grid-item>
          </grid>
          <load-more v-show="isLoadMore" tip="loading"></load-more>
        </div>
      </scroller>
      <br>
      <br>
      <div class="stick" style="position: fixed;bottom: 60px;width: 100%;">
        <cell :title="''" style="background-color: #FFFFFF;display: flex;">
          <div>
            <x-button type="primary" @click.native="$router.push('./delivery')" style="background-color: #5FBEF9;border: solid 1px #447FD4;">配送娃娃</x-button>
          </div>
        </cell>
      </div>
<!--       <el-button type="primary" round @click="$router.push('./delivery')" size="medium">申请发货</el-button> -->
    </div>
  </div>
</template>
<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
import { Panel, Grid, GridItem, GroupTitle, Cell, XButton, Scroller, LoadMore } from 'vux'
export default {
  components: {
    'app-footer': AppFooter,
    Panel,
    Grid,
    GridItem,
    GroupTitle,
    Cell,
    XButton,
    Scroller,
    LoadMore
  },
  data () {
    return {
      userInfo: {balance: ''},
      userGifts: [],
      baseURL: 'https://www.liehuo55.com/',
      checked3: false,
      list: [],
      list1: [],
      offset: 0,
      isLoadMore: false
    }
  },
  // computed: {
  //   list: function () {
  //     if (this.userGifts.length > 0) {
  //       return this.userGifts.map((item) => {
  //         item.src = this.baseURL + item.AvatarUrl
  //         item.fallbackSrc = 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
  //         item.title = item.Name
  //         item.desc = this.utcTimeConvert(item.ReceivedDT)
  //         item.url = '/component/Home'
  //       })
  //     } else {
  //       return [{
  //         src: 'http://somedomain.somdomain/x.jpg',
  //         fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
  //         title: '标题一',
  //         desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
  //         url: '/component/cell'
  //       }]
  //     }
  //     // return this.baseURL
  //   }
  // },
  methods: {
    getUserInfo () {
      apiService.getUserBalance().then(data => {
        console.log('user balance info', data.data)
        this.userInfo.balance = data.data
      })
    },
    getUserGifts (isLoadmore, countOffset, pageCount) {
      apiService.getUserGifts(isLoadmore, countOffset, pageCount).then(data => {
        console.log('user gifts 1111', data.data.Gifts)
        let self = this
        // 把娃娃数据保存
        // this.userGifts = data.data.Gifts
        this.list = data.data.Gifts.map(function (item) {
          item.src = self.baseURL + item.AvatarUrl
          item.fallbackSrc = 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
          item.title = item.Name
          item.desc = self.utcTimeConvert(item.ReceivedDT)
          // item.url = '/component/Home'
          return item
        })
        console.log('new list', this.list)
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
        hour12: false,
        offset: 0,
        isLoadMore: false
      }
      return date.toLocaleDateString('zh-cn', options)
      // return date
    },
    onScrollBottom () {
      if (this.isLoadMore) {
      } else {
        this.isLoadMore = true
        this.offset += 10
        apiService.getUserGifts(this.isLoadMore, this.offset, 10).then(data => {
          console.log('loading more gifts: ', data)
          let self = this
          this.list = this.list.concat(data.data.Gifts.map(function (item) {
            item.src = self.baseURL + item.AvatarUrl
            item.fallbackSrc = 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
            item.title = item.Name
            item.desc = self.utcTimeConvert(item.ReceivedDT)
            // item.url = '/component/Home'
            return item
          }))
          // this.userGifts = data.data.Gifts.filter(gift => gift.Status === 0)
          console.log('new gifts list: ', this.list)
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          })
          this.isLoadMore = false
        }).catch(error => {
          console.log('get gifts history error', error)
          this.isLoadMore = false
        })
      }
    }
  },
  created () {
    this.getUserGifts(true, 0, 10)
    console.log('list1', this.list)
  },
  mounted () {
    this.getUserInfo()
    console.log('list2', this.list)
  }
}
</script>
<style scoped lang="scss" type="text/css">
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
    vertical-align:middle;
  }
  .weui-grids {
    background-color: #fff;
    vertical-align:middle;
    .wei-grid {
      display: flex;
    }
  }
  .weui-grid:after {
    display: none;
  }
  .time {
    font-size: 12px;
  }
  .my-doll {
    text-align: center;
    display: block;
    background-color: #EEEEEE;
    width: 100%;
    /*height: 100%;*/
    overflow-y: scroll;
    /*margin: 0 auto;*/
    .card-wrapper {
      position: relative;
      overflow-y: scroll;
      height: 600px;
      .el-card {
        margin-bottom: 10px;
        .active {
          color: #67C23A;
        }
      }
    }
  }
  .grid-wrapper { /*防止最下面娃娃被底部遮住 */
    padding-bottom: 200px;
  }
/*  .weui-grids:last-child {
    padding-bottom: 200px;
  }*/
</style>
