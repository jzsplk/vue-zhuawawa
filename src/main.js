// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/index.js'
import router from './router'
import WechatAuth from 'vue-wechat-auth'
import axios from 'axios'
// import VueMqtt from 'vue-mqtt'
import _global from './components/Global'

Vue.prototype.global = _global

Vue.config.productionTip = false

Vue.use(WechatAuth, {
  router,
  appid: 'wxb4fd13a5f6f5a7c2',
  responseType: 'code',
  scope: 'snsapi_login',
  getCodeCallback (code, next) {
    axios.get('https://open.weixin.qq.com/connect/qrconnect', {
      params: {
        code,
        state: ''
      }
    }).then(response => {
      let data = response.data
      console.log(data)
      let accessToken = data.data['access_token']
      if (accessToken) {
        console.log('token success: ', accessToken)
      } else {
        console.log('token error: ')
      }
    }).catch((error) => {
      console.log(error)
    })
  }
})

// Vue.use(VueMqtt, 'ws://iot.eclipse.org/ws', {clientId: 'WebCLient-' + parseInt(Math.random() * 100000), username: 'xc', password: '123456'})

/* eslint-disable no-new */
var $vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.$vm = $vm
