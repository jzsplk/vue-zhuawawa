<template>
  <div class="Address-wrapper">
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
          {{address.Street}}
        </el-input>
      </el-form-item>
      <el-form-item label="设置默认">
        <el-switch v-model="form.IsDefault">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="onBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
export default {
  components: {
  },
  data () {
    return {
      lists: [],
      form: {
        Recipient: this.address.Recipient,
        Tel: this.address.Tel,
        Street: this.address.Street,
        detail: '',
        IsDefault: this.address.IsDefault
      },
      options: regionData,
      selectedOptions: []
    }
  },
  props: ['address'],
  computed: {
    addressMessage: function () {
      return {
        City: CodeToText[this.selectedOptions[0]] + ' ' + CodeToText[this.selectedOptions[1]] + ' ' + CodeToText[this.selectedOptions[2]],
        Street: this.form.Street,
        Recipient: this.form.Recipient,
        Tel: this.form.Tel,
        IsDefault: this.form.IsDefault,
        Id: this.address.Id
      }
    }
  },
  methods: {
    onSubmit () {
      // 判断IsDefault是否为真，如果是，则append之后，再设置其为默认地址
      apiService.updateAddress(this.addressMessage).then(data => {
        console.log('updated address', data.data)
        if (this.address.IsDefault === true) {
          this.$emit('update')
          this.$router.push('./address')
          return
        } else {
          if (this.addressMessage.IsDefault === true) {
            apiService.setDefAddress({
              Id: this.address.Id
            }).then(data => {
              console.log('set def ok!')
            })
          }
        }
        // if (this.addressMessage.IsDefault === true) {
        //   apiService.setDefAddress(data.data).then(data => {
        //     console.log('set def ok!')
        //   })
        // }
        this.$emit('update')
        this.$router.push('./address')
      })
    },
    CityConvert (list) {
      return CodeToText[String(list)]
    },
    onBack () {
      // this.$router.push('./address')
      // toggle edit
      this.$emit('toggleEdit')
    }
  },
  created () {
    apiService.getAddressList().then(data => {
      console.log('address list get: ', data.data)
      this.lists = data.data
      // 把父组件地址传来的地址格式由文字格式，转发为selected的array code格式
      this.selectedOptions = this.address.City.split(' ')
      let newsec0 = TextToCode[`${this.selectedOptions[0]}`].code
      let newsec1 = TextToCode[`${this.selectedOptions[0]}`][`${this.selectedOptions[1]}`].code
      let newsec2 = TextToCode[`${this.selectedOptions[0]}`][`${this.selectedOptions[1]}`][`${this.selectedOptions[2]}`].code
      this.selectedOptions[0] = newsec0
      this.selectedOptions[1] = newsec1
      this.selectedOptions[2] = newsec2
    })
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
.Address-wrapper {
  text-align: left;
  margin-top: 20px;
}
</style>
