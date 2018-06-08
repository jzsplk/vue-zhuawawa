<template>
  <div class="Address-List-wrapper">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="city">
          <span>{{address.City}}</span>
          <span>{{address.Street}}</span>
        </div>
        <div class="contact">
          <span>{{address.Recipient}}</span>
          <span>{{address.Tel}}</span>
        </div>
      </div>
      <div class="text item" style="display: flex; justify-content: space-around;align-items: center;">
        <el-switch
          v-model="address.IsDefault"
          active-text="默认"
          inactive-text="">
        </el-switch>
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="deleteAddress(address.Id)"></el-button>
        </el-button-group>
      </div>
    </el-card>
  </div>
</template>

<script>
import apiService from '../API.service.js'
export default {
  components: {
  },
  data () {
    return {
      list: []
    }
  },
  props: ['address'],
  methods: {
    onSubmit () {
    },
    editAddress () {

    },
    deleteAddress (id) {
      apiService.deleteAddress({Id: id}).then(data => {
        console.log('remove address success')
        this.$emit('update')
      })
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
.Address-List-wrapper {
  text-align: left;
  .city {
    font-size: 14px;
    font-weight: bold;
  }
  .contact {
    font-size: 14px;
  }
}
</style>
