<template>
  <div class="bill-wrapper">
    <div class="head">
      <span>账单</span>
    </div>
    <div class="card" v-for="(o, index) in bills.Logs" :key="index">
      <el-card class="box-card">
        <div  class="text item">
          {{ o.Memo }}
        </div>
        <div  class="text item">
          {{ o.Amount*10 + '币'}}
        </div>
        <div  class="text item">
          {{ utcTimeConvert(o.Timestamp) }}
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import apiService from '../API.service.js'
export default {
  data () {
    return {
      bills: {}
    }
  },
  props: [],
  computed: {
  },
  methods: {
    getBilling () {
      apiService.getBilling().then(data => {
        console.log('billing: ', data)
        this.bills = data.data
      })
    },
    // 时间格式转换
    utcTimeConvert (time) {
      let date = new Date(time)
      let options = {
        // weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }
      return date.toLocaleDateString('zh-cn', options)
      // return date
    }
  },
  created () {
    this.getBilling()
  }
}
</script>
<style scoped lang="scss" type="text/css">
.bill-wrapper {
  padding-bottom: 60px;
  .head {
    background-color: #edc83a;
  }
  .card {
    overflow-y: scroll;
    .box-card {
      margin-bottom: 10px;
    }
  }
}
</style>
