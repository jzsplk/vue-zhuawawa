<template>
  <div class="footer">
<!--     <div class="bottom-nav">
      <router-link :to="{path: './'}"><button><img src="/static/pic/home_select.png" alt=""><p>首页</p></button></router-link>
      <router-link :to="{path: './mydoll'}">
        <button><img src="/static/pic/prize_normal.png" alt=""><p>我的娃娃</p></button>
      </router-link>
      <router-link :to="{path: './myinfo'}">
        <button><img src="/static/pic/mine_normal.png" alt=""><p>我的</p></button>
      </router-link>
    </div>
    <div v-if="false" class="copyright">一起抓 <span>&copy;</span>2018 ALL Rights Reserved.</div> -->
    <el-menu
      v-bind:class="{ hide: this.$store.state.isEntered}"
      :default-acitve="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#FFFFFF"
      text-color="#000000"
      active-text-color="#FFD04B">
        <el-menu-item index="./">
          <template slot="title">
            <i class="el-icon-mobile-phone"></i>
            <span>首页</span>
          </template>
          <!-- <span><img src="../../static/pic/home_select.png" alt="">首页</span> -->
        </el-menu-item>
        <el-menu-item index="./mydoll">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>我的娃娃</span>
          </template>
            <!-- <span>
            <img src="../../static/pic/prize_normal.png" alt="">我的娃娃</span> -->
        </el-menu-item>
        <el-menu-item index="./myinfo">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>我的背包</span>
          </template>
<!--           <img src="../../static/pic/mine_normal.png" alt="">
          <span>我的背包</span> -->
        </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: './',
      isPlaying: this.$store.state.isPlaying
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === './') {
        this.$router.push({path: './'})
      } else if (key === './mydoll') {
        this.$router.push({path: './mydoll'})
      } else if (key === './myinfo') {
        this.$router.push({path: './myinfo'})
      }
    }
  }
}
</script>
<style scoped lang="scss" type="text/css">
  .bottom-nav {
    position: fixed;
    bottom: -15px;
    width: 100%;
    background-color: #FFF;
    display: flex;
    justify-content: space-around;
    margin-top: 1.0rem;

    button {
      background-color: #FFFFFF;
      border-style:none;
      p {
        margin-top: 0;
        padding: 0;
      }
    }
  }
  .hide {
    display: none !important;
  }
  .el-menu {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    z-index: 9999;
    .el-menu-item {
      height: 50px;
      line-height: 50px;
      a {
        text-decoration: none;
      }
      p {
        margin-top: 0;
        padding: 0;
        color: #000;
        line-height: 0;
        font-size: 13px;
      }
      img {
        width: 30px;
        margin-bottom: 0;
        padding: 0;
      }
    }
  }
</style>
