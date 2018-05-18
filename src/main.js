// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/index.js'
import router from './router'
import WechatAuth from 'vue-wechat-auth'
// import WechatAuth from './node_modules/vue-wechat-auth/src/wechat-auth.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import touch from 'vue-directive-touch' // 引入vue2-touch-evnets
// import VueMqtt from 'vue-mqtt'
import _global from './components/Global'

Vue.prototype.global = _global
// 设置coookie方法
Vue.prototype.setCookie = (cName, value, expiredays) => {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  console.log('set cookie: ', document.cookie)
}
// 获取cookie、
function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  // console.log('get cookie', document.cookie.match(reg)[2])
  let arr = document.cookie.match(reg)
  if (arr) {
    return arr[2]
  } else {
    return null
  }
}
Vue.prototype.getCookie = getCookie
// 删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

Vue.config.productionTip = false
// 使用移动tap事件插件
Vue.use(touch)
// 使用ElementUI
Vue.use(ElementUI)
// 微信登陆
// let router2 = new Router({
//   routers: [
//     {
//       path: '/',
//       name: 'l',
//       meta: {
//         auth: true
//       }
//     }
//   ]
// })
// console.log('router1', router)
// console.log('router2', router2)
axios.defaults.baseURL = 'https://www.liehuo55.com/'
// axios.defaults.baseURL = 'http://139.199.227.21/'
// console.log('新参数', JSON.stringify(window.params))
Vue.use(WechatAuth, {
  router,
  appid: 'wx229fb7a27a20b375',
  responseType: 'code',
  scope: 'snsapi_userinfo',
  getCodeCallback (code, next) {
    window.params = {
      'AppId': 'wx229fb7a27a20b375',
      'Code': code
    }
    console.log('新参数', JSON.parse(JSON.stringify(window.params)))
    axios.post('api/auth/AuthWith?RefSource=wechat', JSON.parse(JSON.stringify(window.params))).then(response => {
      let data = response.data
      console.log(data)
      // 获取到微信登陆后的处理
      // 存储得到的数据
      let userData = {
        playerId: data.Id,
        token: data.Token,
        AvatarUrl: data.AvatarUrl,
        name: data.FirstName
      }
      // 触发action，把id， token更新到state
      store.dispatch('updataPlayerInfo', userData)
      let jsonUserData = JSON.stringify(userData)
      let expireDays = 1000 * 60 * 60 * 24 * 7
      $vm.setCookie('wxzhuawawa', jsonUserData, expireDays)
      console.log('$vm router', router)
      // router.push('./')
      // 微信登陆下一步动作
      if (data.Token) {
        next(data.Token)
      } else {
        console.log('未获取到token')
        next('', { path: './login' })
      }
    }).catch((error) => {
      console.log(error)
      next('', { path: './' })
    })
  }
})

// 让页面跳转后回到页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
var $vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.$vm = $vm
