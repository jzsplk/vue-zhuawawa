<template>
<div class="wx-loading">
  <div v-transfer-dom>
    <loading :show="show1" :text="text1"></loading>
  </div>
</div>
</template>
<script>
import { Loading, TransferDomDirective as TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  data () {
    return {
      show1: true,
      text1: '微信登陆中'
    }
  },
  components: {
    Loading
  },
  methods: {
    show1change (val) {
      if (val) {
        tick(0, (percent) => {
          if (percent === 100) {
            this.show1 = false
            return
          }
          this.text1 = `${percent}%`
        })
      }
    }
  },
  mounted () {
    this.show1change(true)
  }
}

function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 10)
}
</script>
<style  scoped lang="scss" type="text/css">
.wx-loading {
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
