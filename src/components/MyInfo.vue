<template>
  <div class="UserInfo_wrapper">
    <div class="user_header">
      <div class="avatar">
        <img class="avatar-img" :src="$store.state.playerInfo.AvatarUrl" alt="">
      </div>
      <div class="name">{{$store.state.playerInfo.name}}
      </div>
      <div class="balance">
        <img src="../../static/pic/coin.png" alt=""> {{userInfo.balance * 10}} 币
      </div>
    </div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item>
        <template slot="title" @click="goToMydoll">
          <i class="header-icon el-icon-view"></i>我的娃娃
        </template>
        <el-button @click="goToMydoll" size="mini">查看</el-button>
<!--         <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-tickets"></i>娃娃币账单
        </template>
        <el-button @click="goToBill" size="mini">查看</el-button>
<!--         <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
      </el-collapse-item>
      <el-collapse-item disable="true">
        <template slot="title">
          <i class="header-icon el-icon-star-off"></i>邀请有礼
        </template>
<!--         <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <span><i class="header-icon el-icon-edit"></i>优惠码</span>
        </template>
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" type="number">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="兑换卷" value=""></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="postCoupon(input5)">兑换</el-button>
        </el-input>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-edit-outline"></i>问题反馈
        </template>
<!--         <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
      </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i class="header-icon el-icon-setting"></i>设置
              </template>
              <el-button type="primary" icon="el-icon-edit" size="small" @click="$router.push('./address')">收货地址</el-button>
            </el-collapse-item>
    </el-collapse>
    <div class="list">
      <el-button type="warning" @click="logout">退出登陆</el-button>
      <!-- <button @click="logout">退出登陆</button> -->
      <p>版本号： 0.5.8</p>
    </div>
    <div class="main">
    </div>
    <el-container>
      <el-header>
      </el-header>
      <el-main>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
import WePay from '../WePay.service.js'
export default {
  components: {
    'app-footer': AppFooter
  },
  data () {
    return {
      userInfo: {balance: ''},
      activeName: 1,
      input5: '',
      select: ''
    }
  },
  methods: {
    wepay () {
      WePay.play()
    },
    getUserInfo () {
      apiService.getUserBalance().then(data => {
        console.log('user balance info', data.data)
        this.userInfo.balance = data.data
      })
    },
    logout () {
      // 清理有关微信登陆auth_code
      window.sessionStorage.removeItem('auth_code')
      // 清理微信登陆的token
      window.localStorage.removeItem('access_token')
      this.delCookie('zhuawawa')
      // 暂时不退出微信，等修复微信二次登陆问题
      this.delCookie('wxzhuawawa')
      // 跳转到主页
      setTimeout(this.$router.push('./'), 2000)
    },
    postCoupon (coupon) {
      apiService.postCoupon(coupon).then(data => {
        console.log('user coupon posted', data.data)
        // 增加成功抓到的弹窗
        if (data.data.status === '该优惠券可兑换') {
          window.$vm.$message({
            message: data.data.result,
            type: 'success'
          })
        } else {
          window.$vm.$message({
            message: '可惜 ' + data.data.status
          })
        }
      })
    },
    goToMydoll () {
      this.$router.push('./mydoll')
    },
    goToBill () {
      this.$router.push('./billing')
    }
  },
  created () {
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="scss" type="text/css">
  .list {
    margin-top: 40px;
    p {
      font-size: 13px;
    }
  }
  .UserInfo_wrapper {
    .template {
      float: left;
    }
    .user_header {
      width: 750px;
      max-width: 100%;
      height: 150px;
      margin: 0 auto;
      background: url(../../static/pic/mine_header_bg.png) no-repeat;
      background-size: 100% 100%;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50px;
        margin: 0 auto;
        margin-bottom: 20px;
        .avatar-img {
          width: 60px;
          height: 60px;
          border-radius: 50px;
          margin-top: 20px;
        }
      }
      .name {
        margin-top: 13px;
        font-size: 13px;
      }
      .balance {
        box-sizing: border-box;
        display: inline-block;
        line-height: 2.3;
        border-radius: 1.5rem;
        max-width: 40%;
        padding: 0.2em 1.12em;
        background-color: #575757;
        opacity: 0.5;
        margin: 0 auto;
        color: #FFFFFF;
        font-size: 13px;
        img {
          height: 1rem;
          width: auto;
          vertical-align: middle;
        }
      }
    }
    /*// el-container 有问题，先不用*/
    .el-container {
      .el-header {
        text-align: center;
        width: 100%;
      }
    }
  }
</style>
