<template>
  <div>
    <app-header></app-header>
    <!-- <room></room> -->
    <div class="category">
      <div v-for="room in rooms" v-bind:key="room.id">
        <div class="room">
          <div class="img-wraper">
            <div class="img-container">
              <img :src="room.AvatarUrl" :alt="room.name">
              <p class="status">空闲中</p>
            </div>
          </div>

          <div class="info">
            <p>{{room.name}}</p>
            <span>{{room.coin}} /次</span>
            <button>去捕获</button>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Room from './Room'
export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'room': Room
  },
  data () {
    return {
      rooms: [
        { id: '47DUS2ve4', name: '蒙奇奇公仔', coin: 3, AvatarUrl: 'https://www.iqi1.com/uploads/2240dfc1c5dcd3959ff982d4c88385b4698a3685.jpg', Status: 0, Pictures: [] },
        { id: '7MG2Sxs57Du2JRvT', name: '娃娃代抓礼品', coin: 3, AvatarUrl: 'https://www.iqi1.com/uploads/70a64fa772fb9da962b7b315c99fb700b2e25cb7.jpg', Status: 0, Pictures: [] },
        { id: 'GlWmqQqOGtCmhQqN', name: '蒙奇奇公仔', coin: 12, AvatarUrl: 'https://www.iqi1.com/uploads/2240dfc1c5dcd3959ff982d4c88385b4698a3685.jpg', Status: 0, Pictures: [] },
        { id: 'LHlaSyaOLPpaLyaH', name: '宫崎骏龙猫', coin: 3, AvatarUrl: 'https://www.iqi1.com/uploads/e9558a43b7e294d70d147a912556638b47b67359.jpg', Status: 0, Pictures: [] },
        { id: 'nYYcS958nXscvt5W', name: '蒙奇奇公仔', coin: 3, AvatarUrl: 'https://www.iqi1.com/uploads/2240dfc1c5dcd3959ff982d4c88385b4698a3685.jpg', Status: 0, Pictures: [] },
        { id: 'uVsyS4KTuYwyf4Iy', name: '鹿晗周边公仔', coin: 3, AvatarUrl: 'https://www.iqi1.com/uploads/21a86d5f2808d2e3851f13ad7aca7ee5bcbd2a42.jpg', Status: 0, Pictures: [] },
        { id: 'VqGAS', name: '梨花娃娃', coin: 2, AvatarUrl: 'https://www.iqi1.com/uploads/72b471acfac0130d3942542f9a2c1c5f867f0e8d.jpg', Status: 0, Pictures: [] },
        { id: 'wrF', name: 'asddd', coin: 10, AvatarUrl: 'https://www.iqi1.com/uploads/9ea5bec629ec95b4ed858fd9cd7f2e1974addc85.jpg', Status: 0, Pictures: [] },
        { id: 'WSygS7', name: 'HelloKitty公仔', coin: 4, AvatarUrl: 'https://www.iqi1.com/uploads/5166fff7fe6af1ffa591d5b3abcd24270ec1aa3d.jpg', Status: 0, Pictures: [] },
        { id: 'X1O0SwgsX', name: '创意布朗熊公仔', coin: 5, AvatarUrl: 'https://www.iqi1.com/uploads/dcb6e55a2487de4d1d1ad13d8171a621125132f7.jpg', Status: 0, Pictures: [] },
        { id: 'xBw0SzXrxIc0ozW5', name: '奈良美智', coin: 4, AvatarUrl: 'https://www.iqi1.com/uploads/5349820b500f5e9ce5d5f2802a5e397eca52777f.jpg', Status: 0, Pictures: [] },
        { id: 'UPSzxgy8APzzwk', name: '宠物玩具狗', coin: 4, AvatarUrl: 'https://www.iqi1.com/uploads/57497e971ca604d09f569d7be8a35080dc98e7ac.jpg', Status: 0, Pictures: [] }
      ]
    }
  },
  name: 'Home'
}
</script>
<style scoped lang="scss" type="text/css">
.category {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;

}
.room {
  margin: 10px;
  padding: 0;
  max-width: 380px;
  height: 200px;
  background-color: #E5E67E;
  display: flex;
  border-radius: 20px;
  border-style:solid;
  border-width:5px;
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
    }
  }
  .info {
    display: inline-block;
    width: 50%;
    p {
      margin-top: 2rem;
    }
    button {
      background-color: red;
      color: white;
      border-radius: 10px;
      font-size: 20px;
    }
  }

}
</style>
