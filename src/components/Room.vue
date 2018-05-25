<template>
  <router-link :to="{path:'play',query:{id:room.Id}}">
  <div class="room">
    <div class="img-wraper">
      <div class="img-container">
        <img :src="baseURL + room.Doll.Item.AvatarUrl" :alt="room.Name">
        <p v-show="room.Actor === undefined" class="statusAvailable">空闲中</p>
        <p v-show="room.Actor !== undefined" class="statusPlaying">游戏中</p>
        <p v-show="room.Status === 1" class="statusPlaying">训练场</p>
        <p v-show="room.Status === 2" class="statusPlaying">维护中</p>
        <p v-show="room.Status === 3" class="statusPlaying">房间异常</p>
        <!-- 0是正常，1是训练场，2是维护，3是异常-->
      </div>
    </div>
    <div class="info">
      <p>{{room.Name}}</p>
      <p><!-- 💎 --> <img src="../../static/pic/coin.png" alt=""> {{room.Coin}} /次</p>
      <span>{{room.Crowd}} 人在线 {{room.id}}</span>
      <button class="" v-show="room.Actor === undefined">去捕获</button>
      <button class="" v-show="room.Actor !== undefined">去围观</button>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
  data () {
    return {
      baseURL: 'https://www.liehuo55.com/'
      // baseURL: 'http://139.199.227.21/'
    }
  },
  props: ['room']
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
  box-sizing: border-box;
  margin: 4px 2px 2px 4px;
  padding: 0;
  max-width: 100%;
  height: auto;
  background-color: #E5E67E;
  display: flex;
  border-radius: 10px;
  border-style:solid;
  border-width:2px;
  border-color: #C9B31A;
  .img-container {
    position: relative;
    img {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 10px 0 0 10px;
      overflow: hidden;
    }
    .statusAvailable {
      position: absolute;
      background-color: #67C23A;
      opacity: 0.9;
      color: white;
      right: 2px;
      top: -10px;
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
      top: -10px;
      padding: 2px;
      border-radius: 5px;
      font-size: 13px;
      font-weight: bold;
    }
  }
  .info {
    display: inline-block;
    width: 160px;
    vertical-align: middle;
    font-size: 13px;
    text-decoration: none;
    p {
      margin: 0;
      padding: 0.3em 1.32em;
    }
    button {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
      background-color: #E64340;
      display: inline-block;
      padding: 0 1.32em;
      line-height: 2.3;
      font-size: 13px;
      color: #FFFFFF;
      border-radius: 5px;
      border-width:0;
      overflow: hidden;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    img {
      height: 1rem;
      width: auto;
      vertical-align: middle;
    }
  }
}
</style>
