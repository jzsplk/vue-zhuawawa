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
  name: 'Home'
}
</script>
<style scoped lang="scss" type="text/css">

</style>
