<template>
  <div>
    <app-header></app-header>
    <!-- <room></room> -->
    <category></category>
    <app-footer></app-footer>
  </div>
</template>
<script>
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import Room from './Room'
import Category from './Category'

export default {
  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'room': Room,
    'category': Category
  },
  name: 'Home',
  methods: {
    checkLogin () {
      // 检查是否存在session
      if (!this.getCookie('zhuawawa')) {
        // 如果没有登陆状态则跳转到登陆页
        console.log('no cookie found')
        this.$router.push('/Tulogin')
      } else {
        this.$router.push('/')
        // 如果有session把用户数据提取到state中
        let data = unescape(this.getCookie('zhuawawa'))
        // console.log('getCookie parse: ', JSON.parse(data))
        this.$store.dispatch('updataPlayerInfo', JSON.parse(data))
      }
    }
  },
  created () {
    this.checkLogin()
  },
  watch: {
    // 监听路由变化，检查登陆状态
    '$route': 'checkLogin'
  }
}
</script>
<style scoped lang="scss" type="text/css">

</style>
