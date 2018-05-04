<template>
  <div class="login">
    <router-link to="/login"><button>微信登陆</button></router-link>
    <button @click="login">游客登陆</button>
  </div>
</template>
<script>
import UserInfo from '../Login.service.js'
export default {
  components: {
  },
  methods: {
    login () {
      UserInfo.Login()
    }
  },
  name: 'Login'
}
</script>
<style scoped lang="scss" type="text/css">

</style>
