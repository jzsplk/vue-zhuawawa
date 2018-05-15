<template>
  <div>
    <p></p>
    <app-footer></app-footer>
  </div>

</template>
<script>
import apiService from '../API.service.js'
import AppFooter from './AppFooter'
export default {
  components: {
    'app-footer': AppFooter
  },
  data () {
    return {
      userInfo: {balance: ''}
    }
  },
  methods: {
    getUserInfo () {
      apiService.getUserBalance().then(data => {
        console.log('user balance info', data.data)
        this.userInfo.balance = data.data
      })
    }
  },
  created () {
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style></style>
