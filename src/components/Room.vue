<template>
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
      <router-link :to="{path:'play',query:{id:room.Id}}"><button>去捕获</button></router-link>
    </div>
  </div>
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
.room {
  margin: 10px;
  padding: 0;
  max-width: 380px;
  height: 200px;
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
      width: 200px;
      height: 200px;
      border-radius: 15px 0 0 15px;
    }
    .status {
      position: absolute;
      background-color: black;
      color: white;
      right: 20px;
      top: 20px;
      padding: 4px;
      border-radius: 10px;
    }
  }
  .info {
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    p {
      margin-top: 2rem;
    }
    button {
      background-color: red;
      color: white;
      border-radius: 10px;
      font-size: 20px;
    }
    button:hover {
      background-color: white;
      color: red;
    }
    img {
      height: 1rem;
      width: auto;
      vertical-align: middle;
    }
  }
}
</style>
