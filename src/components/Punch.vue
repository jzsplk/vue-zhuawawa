<template>
  <div class="punch">
    <div v-transfer-dom>
      <x-dialog v-model="showPunch" class="dialog-demo" hide-on-blur>
        <div class="img-box">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
        </div>
        <div class="content-box">
          <div class="overlay">
            <img :src="'../../static/pic/coin.png'" alt="" style="{width: 60px; height: 60px;}">
          </div>
          <div class="count1">
            每日签到赠送 10-30 娃娃币
          </div>
          <div class="count">
            已签到{{Punched}}天
          </div>
          <div class="count">
            连续签到{{Continued}}天
          </div>
          <x-button type="primary" @click.native="Punch">签到</x-button>
        </div>
        <div @click="showPunch=false" class="close">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import apiService from './API.service.js'
import { XHeader, TransferDom, Actionsheet, XDialog, XButton } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    XButton
  },
  data () {
    return {
      isPunched: false,
      showPunch: true,
      Punched: 0,
      Continued: 0
    }
  },
  props: ['rank'],
  methods: {
    checkPunchin () {
      apiService.getPunchin().then(data => {
        console.log('punchin data: ', data.data)
        if (data.data.Flag) {
          this.isPunched = false
          console.log('not punched yet ')
          // show the punchin window
          this.showPunch = true
          this.Punched = data.data.Punched
          this.Continued = data.data.Continued
        } else {
          this.isPunched = true
          console.log('is punch in ')
          this.Punched = data.data.Punched
          this.Continued = data.data.Continued
          // dont show the punchin window
        }
      })
    },
    Punch () { // request Punch in
      apiService.Punchin().then(data => {
        console.log('Punched info: ', data)
        this.$vux.toast.show({
          text: `已签到 得到 ${data.data * 10} 娃娃币`
        })
        this.Punched += 1
        this.Continued += 1
      })
        .catch(error => {
          console.log('punch error', error.response)
        })
    }
  }
}
</script>

<style scoped lang="scss" type="text/css">
.punch {
  display: block;
  .img-box {
    height: 150px;
    overflow: hidden;
  }
  .content-box {
    position: relative;
    height: 160px;
    .overlay {
      position: absolute;
      top: -30px;
      left: 40%;
      z-index: 999;
    }
    .count1 {
      padding-top: 30px;
    }
    .count {
      margin-top: 0px;
      margin-bottom: 0px;
    }
  }
}
</style>
