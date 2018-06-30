<template>
<div class="setting">
  <divider>{{ '设置' }}</divider>
  <group>
    <cell title="收货地址" value="" is-link @click.native="$router.push('./address')"></cell>
  </group>
  <!-- test modity mqtt api address -->
<!--   <group title="set mqtt address">
    <x-input title="MQTT" name="username" :placeholder="address.mqtt" v-model="address.mqtt"></x-input>
  </group>
  <group title="set api address">
    <x-input title="API" name="username" :placeholder="address.api" v-model="address.api"></x-input>
  </group>
  <div style="padding:15px;">
    <x-button @click.native="modifyAddress" type="primary"> 修改 </x-button>
  </div> -->
  <br>
  <br>
  <group>
    <x-switch title="背景音乐" v-model="music" disabled></x-switch>
    <x-switch title="音效" v-model="backsound" disabled></x-switch>
    <x-switch title="震动" v-model="move" disabled></x-switch>
  </group>
</div>
</template>
<script>
import { Group, Cell, XSwitch, CellBox, Divider, XInput, XButton } from 'vux'
export default {
  data () {
    return {
      music: false,
      backsound: false,
      move: false,
      address: {
        mqtt: '',
        api: ''
      }
    }
  },
  components: {
    Group,
    Cell,
    CellBox,
    XSwitch,
    Divider,
    XInput,
    XButton
  },
  methods: {
    next () { // 下一步
      if (this.active++ > 4) {
        this.active = 0
      }
    },
    showGuide () { // 增加一个帮助界面
    },
    modifyAddress () {
      window.localStorage.setItem('hostname', JSON.stringify(this.address))
      // 暂时不退出微信，等修复微信二次登陆问题
      this.delCookie('zhuawawa')
      this.delCookie('wxzhuawawa')
      this.delCookie('wxlogin')
      // 跳转到主页
      setTimeout(this.$router.push('./'), 2000)
    },
    initAddress () {
      this.address.mqtt = JSON.parse(window.localStorage.getItem('hostname')).mqtt
      this.address.api = JSON.parse(window.localStorage.getItem('hostname')).api
    }
  },
  created () {
    // this.initAddress()
  },
  mounted () {
  }
}
</script>
<style  scoped lang="scss" type="text/css">
.setting {
  text-align: left;
  .header {
    margin-bottom: 30px;
  }
  .code {
    margin: 0 auto;
    width: 320px;
    max-width: 50%;
  }
  .info {
    max-width: 80%;
    margin: 0 auto;
    .import {
      color: #E18745;
    }
  }
}
</style>
