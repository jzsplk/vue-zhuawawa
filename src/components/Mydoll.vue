<template>
  <div class="my-doll">
    <p>可在APP内申请发货</p>
    <div class="card-wrapper">
      <el-row>
        <el-col :span="10" v-for="(o, index) in userGifts" :key="index" :offset="index % 2 !== 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="baseURL + o.AvatarUrl" class="image">
            <div style="padding: 14px;">
              <span>{{o.Name}}</span>
              <div class="bottom clearfix">
                <time class="time">{{utcTimeConvert(o.ReceivedDT)}}</time>
                <el-button type="text" class="button">可兑换</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
export default {
  components: {
    'app-footer': AppFooter
  },
  data () {
    return {
      userInfo: {balance: ''},
      userGifts: [],
      baseURL: 'https://www.liehuo55.com/'
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
        minute: '2-digit'
      }
      return date.toLocaleDateString('zh-cn', options)
      // return date
    }
  },
  created () {
    this.getUserGifts()
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
  .my-doll {
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
      }
    }
  }
</style>
