<template>
  <router-link :to="{path:'play',query:{id:room.Id}}">
  <div class="room">
    <div class="img-wraper">
      <div class="img-container">
        <img :src="baseURL + room.Doll.Item.AvatarUrl" :alt="room.Name">
        <p class="status">{{room.Status == 0 ? '空闲中' : '游戏中'}}</p>
      </div>
    </div>

    <div class="info">
      <p>{{room.Name}}</p>
      <p><!-- 💎 --> <img src="../../static/pic/coin.png" alt=""> {{room.Coin}} /次</p>
      <span>{{room.Crowd}} 人在线 {{room.id}}</span>
      <button>去捕获</button>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
  data () {
    return {
      baseURL: 'https://www.iqi1.com/'
    }
  },
  props: ['room']
}
</script>

<style scoped lang="scss" type="text/css">
a {
  text-decoration: none;
  color: #000;
}
.router-link-active {
  text-decoration: none;
}
.room {
  margin: 4px 2px 2px 4px;
  padding: 0;
  max-width: 100%;
  height: 100px;
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
    .status {
      position: absolute;
      background-color: black;
      opacity: 0.7;
      color: white;
      right: 2px;
      top: -10px;
      padding: 2px;
      border-radius: 5px;
      font-size: 13px;
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
