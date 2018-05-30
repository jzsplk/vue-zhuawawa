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
        </el-menu-item>
        <el-menu-item index="./mydoll">
          <template slot="title">
            <i class="el-icon-view"></i>
            <span>我的娃娃</span>
          </template>
        </el-menu-item>
        <el-menu-item index="./myinfo">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>我的背包</span>
          </template>
        </el-menu-item>
    </el-menu>
<!--     <div class="footer-wrapper" v-bind:class="{ hide: this.$store.state.isEntered}">
      <div class="phone-viewport">
        <md-bottom-bar class="md-accent" md-type="shift">
          <md-bottom-bar-item  id="bottom-bar-item-home" md-label="首页" md-icon="home" @click="$router.push('./')"></md-bottom-bar-item>
          <md-bottom-bar-item  id="bottom-bar-item-pages" md-label="我的娃娃" md-icon="favorite" @click="$router.push('./mydoll')">
            <md-icon>favorite</md-icon>
            <span class="md-bottom-bar-label">我的娃娃</span>
            <i class="badge" v-if="dolls">{{ dolls }}</i>
          </md-bottom-bar-item>
          <md-bottom-bar-item  id="bottom-bar-item-favorites" md-label="我的背包" md-icon="pages" @click="$router.push('./myinfo')"></md-bottom-bar-item>
        </md-bottom-bar>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: './',
      isPlaying: this.$store.state.isPlaying,
      // name: 'Shift',
      newPosts: 4
    }
  },
  props: ['dolls'],
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
.footer {
  width: 100%;
}
  .hide {
    display: none !important;
  }
  .footer-wrapper {
    width: 100%;
/*    .phone-viewport {
      width: 100%;
      height: auto;
      display: inline-flex;
      align-items: flex-end;
      overflow: hidden;
      border: 1px solid rgba(#000, .26);
      background: rgba(#000, .06);
      .badge {
          width: 19px;
          height: 19px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 6px;
          right: 6px;
          background: #fff;
          border-radius: 100%;
          color: #000;
          font-size: 10px;
          font-style: normal;
          font-weight: 600;
          letter-spacing: -.05em;
          font-family: 'Roboto Mono', monospace;
        }
    }*/
  }
  .el-menu {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    z-index: 999;
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
