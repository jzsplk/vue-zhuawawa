<template>
<!--   <router-link :to="{path:'play',query:{id:room.Id}}"> -->
  <div class="room" v-bind:class="{ active: room.Actor !== undefined }" @click="enterPlaying(room.Status)">
    <div class="img-wrapper">
      <div class="img-container">
        <img :src="baseURL + room.Doll.Item.AvatarUrl" :alt="room.Name">
        <p v-show="room.Actor === undefined" class="statusAvailable">空闲中</p>
        <p v-show="room.Actor !== undefined" class="statusPlaying">游戏中({{room.Crowd}}人)</p>
        <p v-show="room.Status === 1" class="statusPlaying">训练场</p>
        <p v-show="room.Status === 2" class="statusPlaying">维护中</p>
        <p v-show="room.Status === 3" class="statusPlaying">房间异常</p>
        <!-- 0是正常，1是训练场，2是维护，3是异常-->
      </div>
    </div>
    <div class="info">
      <div class="info-name">
        <p>{{room.Name}}</p>
        <p><img src="../../static/pic/coin.png" alt=""> {{room.Coin}} /次</p>
      </div>
      <div class="info-button">
        <!-- <span>{{room.Crowd}} 人在线 {{room.id}}</span> -->
        <button class="" v-show="room.Actor === undefined">去捕获</button>
        <button class="" v-show="room.Actor !== undefined">去围观</button>
      </div>
    </div>
  </div>
<!--   </router-link> -->
</template>

<script>
import { WechatEmotion as Emotion } from 'vux'
export default {
  components: {
    Emotion
  },
  data () {
    return {
      baseURL: 'https://www.liehuo55.com/'
      // baseURL: 'http://139.199.227.21/'
      // baseURL: 'http://zhuaww.gongyou.co/weixin/'
    }
  },
  props: ['room'],
  methods: {
    enterPlaying (state) {
      if (state !== 0) {
        this.$vux.toast.show({
          text: '房间维护中'
        })
        return false
      } else {
        this.$router.push({path: 'play', query: {id: this.room.Id}})
      }
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
a {
  text-decoration: none;
  color: #000 !important;
}
a:hover, a:visited, a:link, a:active {
  text-decoration: none;
  color: #000 !important;
}
.router-link-active {
  text-decoration: none;
}
.room {
  text-align: center;
  box-sizing: border-box;
  margin: 4px 2px 2px 4px;
  padding: 0;
  width:46%;
  max-width: 100%;
  height: 13rem;
/*  background-color: #E5E67E;*/
  border-radius: 10px;
  border-style:solid;
  border-width:1px;
  border-color: #67C23A;
  .img-wrapper {
    display: block;
    width: 100%;
    .img-container {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 10rem;
        overflow: hidden;
        border-radius: 10px 10px 0 0;
      }
      .statusAvailable {
        position: absolute;
        background-color: #67C23A;
        opacity: 0.9;
        color: white;
        right: 2px;
        top: 5px;
        padding: 2px;
        border-radius: 5px;
        font-size: 13px;
      }
      .statusPlaying {
        position: absolute;
        /*background-color: #E6A23C;*/
        background-color: #F56C6C;
        opacity: 0.9;
        color: white;
        right: 2px;
        top: 5px;
        padding: 2px;
        border-radius: 5px;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
  .info {
    display: flex;
    width: 100%;
/*    vertical-align: middle;*/
    font-size: 13px;
/*    text-decoration: none;*/
    .info-name {
      display: inline-block;
      width: 70%;
      text-align: left;
      text-overflow:ellipsis;overflow:hidden;
      p { /* 不换行，多余部分显示省略号*/
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin: 0;
        padding: 0em 0.12em;
      }
    }
    .info-button {
      display: inline-block;
      width: 30%;
      button {
        min-width: 30px;
        position: relative;
        margin-left: -10px;
        margin-right: auto;
        box-sizing: border-box;
        background-color: #E64340;
        display: inline-block;
        padding: 0 0.32em;
        line-height: 2.3;
        font-size: 13px;
        color: #FFFFFF;
        border-radius: 5px;
        border-width:0;
        overflow: hidden;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    img {
      height: 1rem;
      width: auto;
      vertical-align: middle;
    }
  }
}
.active {
  border-color: #E10005;
}
</style>
