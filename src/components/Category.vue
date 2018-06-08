<template>
  <div class="category">
<!--     <div v-for="room in rooms" v-bind:key="room.id">
      <category-room :room="room"></category-room>
    </div> -->
    <div class="rooms-wrapper">
      <category-room v-for="room in rooms" v-bind:key="room.id" :room="room" class="rooms"></category-room>
    </div>
  </div>
</template>
<script>
import Room from './Room'
import apiService from '../API.service.js'
export default {
  components: {
    'category-room': Room
  },
  data () {
    return {
      rooms: []
    }
  },
  methods: {
    loadRooms () {
      apiService.getRooms().then(data => {
        this.rooms = data
        console.log('get Rooms data', data)
        // 这里把房间数据传到state中，用于mqtt一次注册所有房间
        this.$store.dispatch('getRoomsInfo', data)
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.loadRooms()
    }
  },
  created () {
    this.loadRooms()
  },
  mounted () {
  }
}

</script>
<style scoped lang="scss" type="text/css">
  .category {
    max-width: 750px;
    margin: 0 auto;
    background-color: #F7CB54;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    padding-bottom: 100px;
    .rooms-wrapper { /* 房间卡片的容器*/
      /*display: flex;*/ /* 兼容华为老版浏览器：flex修改 */
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      flex-wrap: wrap;
      /*align-items: center;*/ /* 兼容华为老浏览器修改*/
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      align-content: space-between;
      width: 95%;
      background-color: #FFFFFF;
      border-radius: 10px;
      margin-top: 20px;
      padding: 0px;
      .rooms {
        margin: 5px;
      }
    }
  }
</style>
