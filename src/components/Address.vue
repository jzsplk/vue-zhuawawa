<template>
  <div class="Address-wrapper">
    <p>收货地址</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="收货人">
        <el-input v-model="form.name" size="medium"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" placeholder="手机号码">
        </el-input>
      </el-form-item>
      <el-form-item label="所在地区">
        <el-input v-model="form.address" placeholder="北京市">
        </el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="form.detail" type="textarea"
  :rows="3" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      <el-form-item label="设置默认">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
    </el-form>
    <el-button type="primary" icon="el-icon-edit" round>添加收货地址</el-button>
  </div>
</template>

<script>
// import apiService from '../API.service.js'
export default {
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        detail: '',
        delivery: false
      }
    }
  },
  methods: {
  },
  created () {
    this.getPayList()
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
</style>
