<template>
  <div class="my-doll">
    <span>我的娃娃</span>
    <div class="card-wrapper">
      <el-row>
        <el-col :span="10" v-for="(o, index) in userGifts" :key="index" :offset="index % 2 !== 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="baseURL + o.AvatarUrl" class="image">
            <div style="padding: 14px;">
              <!-- <el-checkbox v-model="o.check" label="邮寄" border></el-checkbox> -->
              <span>{{o.Name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{utcTimeConvert(o.ReceivedDT)}}</time>
                <el-button style="float: right;" type="text" v-bind:class="{ active: o.Status === 1 }">{{o.Status === 0 ? '可兑换' : '已发货'}}</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br>
      <br>
      <el-button type="primary" round @click="$router.push('./delivery')" size="medium">申请发货</el-button>
    </div>
    <div class="panel-wrapper">
      <panel :header="'我的娃娃'" :list="list" :type="'1'"></panel>
    </div>
  </div>
</template>
<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
import { Panel } from 'vux'
export default {
  components: {
    'app-footer': AppFooter,
    Panel
  },
  data () {
    return {
      userInfo: {balance: ''},
      userGifts: [],
      baseURL: 'https://www.liehuo55.com/',
      checked3: false
    }
  },
  computed: {
    list: function () {
      if (this.userGifts.length > 0) {
        return this.userGifts.forEach((item) => {
          item.src = this.baseURL + item.AvatarUrl
          item.fallbackSrc = 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff'
          item.title = item.Name
          item.desc = this.utcTimeConvert(item.ReceivedDT)
        })
      }
      // return this.baseURL
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
        // 把娃娃数据保存
        this.userGifts = data.data.Gifts
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
    }
  },
  created () {
    this.getUserGifts()
    console.log('list1', this.list)
  },
  mounted () {
    this.getUserInfo()
    console.log('list2', this.list)
  }
}
</script>
<style scoped lang="scss" type="text/css">
  .time {
    font-size: 12px;
  }
  .my-doll {
    text-align: center;
    display: block;
    background-color: #edc83a;
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
        .active {
          color: #67C23A;
        }
      }
    }
  }
</style>
