<template>
  <div class="ranks">
    <div class="wrapper">
      排行榜
    </div>
    <emotion>微笑</emotion>
    <div class="avatar-box">
      <div class="lan" v-for="(rank, index) in ranks" :key="index">
        <div class="container" >
          <div class="super">
            <!-- <img :src="rank.AvatarUrl" alt="" class="avatar"> -->
            <div class="react"></div>
            <div class="desc">{{index + 1}}</div>
            <div class="content">
              <img :src="rank.AvatarUrl" alt="" class="avatar" :style="{width: size + 'px', height: size + 'px'}">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="avatar-box">
      <charge-rank-avatar :data="ranks[1]" :size="60" :desc="2"></charge-rank-avatar>
      <charge-rank-avatar :data="ranks[0]" :size="80" :desc="1"></charge-rank-avatar>
      <charge-rank-avatar :data="ranks[2]" :size="60" :desc="3"></charge-rank-avatar>
    </div>
  </div>
</template>

<script>
import { WechatEmotion as Emotion } from 'vux'
import Avatar from './ChargeRank-avatar'
export default {
  components: {
    Emotion,
    'charge-rank-avatar': Avatar
  },
  data () {
    return {
      // baseURL: 'https://www.liehuo55.com/'
      // baseURL: 'http://139.199.227.21/'
      // baseURL: 'http://zhuaww.gongyou.co/weixin/'
      size: 100,
      ranks: [
        {
          AvatarUrl: 'https://alicdn.gongyou.co/headimg/75.jpg',
          NickName: 'ゝ贝多芬的旋律，那么感伤',
          Coin: 500
        },
        {
          AvatarUrl: 'https://alicdn.gongyou.co/headimg/89.jpg',
          NickName: '亾嗨箛獨症',
          Coin: 300
        },
        {
          AvatarUrl: 'https://alicdn.gongyou.co/headimg/79.jpg',
          NickName: '惢｝、疼ㄋ_°',
          Coin: 200
        }
      ]
    }
  },
  props: ['data'],
  methods: {
  }
}
</script>

<style scoped lang="scss" type="text/css">
.ranks {
  display: block;
  .avatar-box {
    display: flex;
    justify-content: center;
    align-items: baseline;
    .lan {
      position: relative;
      display: block;
      .container {
        width: 100px;
        height: 100px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: #FFF;
        margin-bottom: 20px;
        .super {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 130px;
          height: 130px;
          overflow: hidden;
          .avatar {
            width: 60px;
            height: 60px;
            border: 2px solid green;
            border-radius: 60px;
          }
          .react {
            width: 50px;
            height: 50px;
            margin: -25px 0 0 -25px;
            background: #31b968;
            transform: rotateZ(45deg);
          }
          .desc {
            position: absolute;
            top: 2%;
            left: 2%;
            z-index: 1;
          }
          .content {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -50%;
            margin-left: -50%;
          }
        }
      }
    }
  }
}
</style>
