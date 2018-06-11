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
          inactive-text=""
          disabled>
        </el-switch>
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit" @click="toggleEdit"></el-button>
          <el-button type="primary" icon="el-icon-delete" @click="deleteAddress(address.Id)"></el-button>
        </el-button-group>
      </div>
    </el-card>
    <address-list-edit v-on:toggleEdit="toggleEdit" :address="address" v-show="isEdit" v-on:update="update"></address-list-edit>
  </div>
</template>

<script>
import apiService from '../API.service.js'
import AddressListEdit from './Address-List-Edit'
export default {
  components: {
    'address-list-edit': AddressListEdit
  },
  data () {
    return {
      list: [],
      isEdit: false
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
    },
    toggleEdit () {
      if (this.isEdit) {
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    update () {
      this.$emit('update')
      this.toggleEdit()
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
