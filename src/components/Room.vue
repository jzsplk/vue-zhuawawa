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
      <p>💎 <img src="/static/pic/coin.png" alt=""> {{room.Coin}} /次</p>
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
  margin: 10px;
  padding: 0;
  max-width: 350px;
  height: 100px;
  background-color: #E5E67E;
  display: flex;
  border-radius: 20px;
  border-style:solid;
  border-width:2px;
  border-color: #C9B31A;
  .img-container {
    position: relative;
    img {
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 15px 0 0 15px;
    }
    .status {
      position: absolute;
      background-color: black;
      color: white;
      right: 0;
      top: 0;
      padding: 2px;
      border-radius: 10px;
      font-size: 0.2rem;
    }
  }
  .info {
    display: inline-block;
    width: 160px;
    vertical-align: middle;
    font-size: 0.2rem;
    text-decoration: none;
    p {
      margin-top: 0.5rem;
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
