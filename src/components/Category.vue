<template>
  <div class="category">
    <div v-for="room in rooms" v-bind:key="room.id">
      <category-room :room="room"></category-room>
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
    background-color: #E7E0DD;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    padding-bottom: 100px;
  }
</style>
