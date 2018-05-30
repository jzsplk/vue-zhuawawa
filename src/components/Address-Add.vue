<template>
  <div class="Address-wrapper">
    <p>新增收货地址</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="收货人">
        <el-input v-model="form.Recipient" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.Tel" placeholder="手机号码" type="number">
        </el-input>
      </el-form-item>
      <el-form-item label="所在地区">
<!--         <el-input v-model="form.address" placeholder="北京市">
        </el-input> -->
        <el-cascader :options="options" v-model="selectedOptions"></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.Street" type="textarea"
  :rows="3" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等">
        </el-input>
      </el-form-item>
      <el-form-item label="设置默认">
        <el-switch v-model="form.IsDefault"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  components: {
  },
  data () {
    return {
      lists: [],
      form: {
        Recipient: '',
        Tel: '',
        Street: '',
        detail: '',
        IsDefault: false
      },
      options: regionData,
      selectedOptions: []
    }
  },
  computed: {
    addressMessage: function () {
      return {
        City: CodeToText[this.selectedOptions[0]] + ' ' + CodeToText[this.selectedOptions[1]] + ' ' + CodeToText[this.selectedOptions[2]],
        Street: this.form.Street,
        Recipient: this.form.Recipient,
        Tel: this.form.Tel,
        IsDefault: this.form.IsDefault
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.addressMessage)
      console.log('new methods: ', this.selectedOptions.forEach(li => {
        this.CityConvert(li)
      }))
      // 判断IsDefault是否为真，如果是，则append之后，再设置其为默认地址
      apiService.appendAddress(this.addressMessage).then(data => {
        console.log('appended', data.data)
        if (this.addressMessage.IsDefault === true) {
          apiService.setDefAddress(data.data).then(data => {
            console.log('set def ok!')
          })
        }
        this.$router.push('./address')
      })
    },
    CityConvert (list) {
      return CodeToText[String(list)]
    },
    onBack () {
      this.$router.push('./address')
    }
  },
  created () {
    apiService.getAddressList().then(data => {
      console.log('address list get: ', data.data)
      this.lists = data.data
    })
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
</style>
