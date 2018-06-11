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
<!--     <el-collapse v-model="activeName" accordion>
      <el-collapse-item>
        <template slot="title" @click="goToMydoll">
          <i class="header-icon el-icon-view"></i>我的娃娃
        </template>
        <el-button @click="goToMydoll" size="mini">查看</el-button>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-tickets"></i>娃娃币账单
        </template>
        <el-button @click="goToBill" size="mini">查看</el-button>
      </el-collapse-item>
      <el-collapse-item disable="true">
        <template slot="title">
          <i class="header-icon el-icon-star-off"></i>邀请有礼
        </template>
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
      </el-collapse-item>
            <el-collapse-item>
              <template slot="title">
                <i class="header-icon el-icon-setting"></i>设置
              </template>
              <el-button type="primary" icon="el-icon-edit" size="small" @click="$router.push('./address')">收货地址</el-button>
            </el-collapse-item>
    </el-collapse> -->
    <div class="cells">
      <group :title="''">
       <cell is-link @click.native="goToBill">
         <span slot="title" style=""><span style="vertical-align:middle;">{{ '娃娃币账单' }}</span></span>
         <x-icon slot="icon" type="_ionicons_svg_ios-document" size="20" class="cell-x-icon"></x-icon>
       </cell>
       <cell :title="'常见问题'" is-link @click.native="$router.push('./questions')">
          <x-icon slot="icon" type="_ionicons_svg_ios-megaphone" size="20" class="cell-x-icon"></x-icon>
       </cell>
       <cell :title="'优惠码'" is-link @click.native="$router.push('./coupon')">
          <x-icon slot="icon" type="_ionicons_svg_ios-gift" size="20" class="cell-x-icon"></x-icon>
          <!-- <i slot="icon" class="header-icon el-icon-star-off"></i> -->
       </cell>
       <cell :title="'问题反馈'" is-link @click.native="goToFeed">
          <x-icon slot="icon" type="_ionicons_svg_ios-chatbubbles" size="20" class="cell-x-icon"></x-icon>
       </cell>
       <cell :title="'设置'" is-link @click.native="$router.push('./setting')">
          <x-icon slot="icon" type="ios-settings" size="20" class="cell-x-icon"></x-icon>
       </cell>
<!--        <cell :title="'设置'" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=">
       </cell> -->
     </group>
    </div>
    <div class="list">
<!--       <x-icon type="ios-ionic-outline" size="30"></x-icon> -->
      <x-button mini plain type="primary" @click.native="logout" style="color: #B29036;background-color: #F9DC3D; border-color: #B29036;">退出登陆</x-button>
      <!-- <el-button type="warning" @click="logout">退出登陆</el-button> -->
      <!-- <button @click="logout">退出登陆</button> -->
      <p>版本号： 0.5.9</p>
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
import { XButton, Group, Cell, CellFormPreview, CellBox, Badge } from 'vux'

export default {
  components: {
    'app-footer': AppFooter,
    XButton,
    Group,
    Cell,
    CellFormPreview,
    CellBox,
    Badge
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
    },
    goToFeed () {
      this.$router.push('./feedback')
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
.cells {
  width: 750px;
  max-width: 100%;
  margin: 0 auto;
}
.vux-x-icon {
  fill: #F70968;
}
.cell-x-icon {
  display: block;
  fill: #F9DC3D;
}
.weui-cells {
  text-align: left;
}
  .list {
    text-align: center;
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
      text-align: center;
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
