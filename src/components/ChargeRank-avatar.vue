<template>
  <div class="ranks">
    <div class="lan">
      <div class="container" >
        <div class="super">
          <!-- <img :src="rank.AvatarUrl" alt="" class="avatar"> -->
          <div class="react"></div>
          <div class="desc">{{desc}}</div>
          <div class="content">
            <img :src="data.AvatarUrl" alt="" class="avatar" :style="{width: size + 'px', height: size + 'px'}">
            <div class="name">{{data.NickName}}</div>
            <div>{{data.Coin}}币</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WechatEmotion as Emotion } from 'vux'
export default {
  components: {
    Emotion
  },
  data () {
    return {
      // baseURL: 'https://www.liehuo55.com/'
      // baseURL: 'http://139.199.227.21/'
      // baseURL: 'http://zhuaww.gongyou.co/weixin/'
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
  props: ['data', 'size', 'desc'],
  methods: {
  }
}
</script>

<style scoped lang="scss" type="text/css">
.ranks {
  display: block;
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
          .name {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
