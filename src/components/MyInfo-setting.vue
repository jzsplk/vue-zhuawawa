<template>
<div class="setting">
  <divider>{{ '设置' }}</divider>
  <group>
    <cell title="收货地址" value="" is-link @click.native="$router.push('./address')"></cell>
  </group>
  <br>
  <br>
  <group>
    <x-switch title="背景音乐" v-model="music"></x-switch>
    <x-switch title="音效" v-model="backsound"></x-switch>
    <x-switch title="震动" v-model="move"></x-switch>
  </group>
</div>
</template>
<script>
import { Group, Cell, XSwitch, CellBox, Divider } from 'vux'
export default {
  data () {
    return {
      music: true,
      backsound: true,
      move: true
    }
  },
  components: {
    Group,
    Cell,
    CellBox,
    XSwitch,
    Divider
  },
  methods: {
    next () { // 下一步
      if (this.active++ > 4) {
        this.active = 0
      }
    },
    showGuide () { // 增加一个帮助界面
    }
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
