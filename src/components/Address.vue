<template>
  <div class="Address-wrapper">
    <div class="address-list" v-for="list in lists" v-bind:key="list.Id">
      <address-list :address="list" v-on:update="updateAddress"></address-list>
    </div>
    <p v-if="lists.length === 0">请增加收货地址</p>
<!--     <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="收货人">
        <el-input v-model="form.Recipient" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.Tel" placeholder="手机号码">
        </el-input>
      </el-form-item>
      <el-form-item label="所在地区">
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
        <el-button>取消</el-button>
      </el-form-item>
    </el-form> -->
    <br>
    <el-button type="primary" icon="el-icon-edit" round @click="$router.push('./add-address')">添加收货地址</el-button>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import { regionData, CodeToText } from 'element-china-area-data'
import AddressList from './Address-List'
export default {
  components: {
    'address-list': AddressList
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
        Tel: this.form.Tel
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.addressMessage)
      console.log('new methods: ', this.selectedOptions.forEach(li => {
        this.CityConvert(li)
      }))
      apiService.appendAddress(this.addressMessage).then(data => {
        console.log('appended', data.data)
      })
    },
    CityConvert (list) {
      return CodeToText[String(list)]
    },
    updateAddress () {
      apiService.getAddressList().then(data => {
        console.log('address list update: ', data.data)
        this.lists = data.data
      })
    }
  },
  created () {
    // this.getPayList()
    console.log('regionData', regionData)
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
.Address-wrapper {
  text-align: center;
}
</style>
