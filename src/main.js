// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import store from './vuex/index.js'
import router from './router'
// import WechatAuth from 'vue-wechat-auth'
// import WechatAuth from './node_modules/vue-wechat-auth/src/wechat-auth.js'
// ElementUI
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// vue-material
// import { MdButton, MdContent, MdTabs, MdBottomBar } from 'vue-material/dist/components'
// 由于微信浏览器不支持VueMaterial更改其他库
// import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css'
import axios from 'axios'
import touch from 'vue-directive-touch' // 引入vue2-touch-evnets
// import VueMqtt from 'vue-mqtt'
import _global from './components/Global'
import 'babel-polyfill' // polyfill
import WechatAuth from './wechat-auth.service.js' // 引入微信登陆模块
import { ToastPlugin } from 'vux' // ToastPlugin from vux
Vue.use(ToastPlugin)

// vux 设置
const FastClick = require('fastclick')
FastClick.attach(document.body)

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
// axios.defaults.baseURL = 'https://www.liehuo55.com/'
axios.defaults.baseURL = _global.hostname
// axios.defaults.baseURL = 'http://139.199.227.21'
// console.log('新参数', JSON.stringify(window.params))
// 如果浏览器是微信 请求微信登陆
// 检查是否是微信浏览器
Vue.use(WechatAuth, {
  router,
  // appid: 'wx229fb7a27a20b375', // online version AppId
  appid: _global.appid, // test version AppId
  responseType: 'code',
  scope: 'snsapi_userinfo',
  getCodeCallback (code, next) {
    window.params = {
      // 'AppId': 'wx229fb7a27a20b375', // online version AppId
      'AppId': _global.appid, // online version AppId
      'Code': code
    }
    console.log('微信登陆参数', JSON.parse(JSON.stringify(window.params)))
    if (code) {
      console.log('获取到了code， 设定token值阻止再次callback')
      console.log('改为跳转到loading页面')
      next(code, {path: './wxloading'})
    } else {
      console.log('code 获取失败')
      next('', {path: './myinfo'})
    }
    axios.post('api/auth/AuthWith?RefSource=wechat', JSON.parse(JSON.stringify(window.params))).then(response => {
      let data = response.data
      console.log('微信登陆成功,数据: ', data)
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
      let expireDays = 1000 * 60 * 60 * 24 * 15
      $vm.setCookie('wxzhuawawa', jsonUserData, expireDays)
      // 微信登陆下一步动作
      if (data.Token) {
        next(userData, {path: './'})
      } else {
        console.log('未获取到token')
        next('', {path: './myinfo'})
      }
    }).catch((error) => {
      console.log('微信登陆请求失败', error)
      next('', {path: './myinfo'})
    })
  }
})

// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)
// Vue.use(MdBottomBar)
// Vue.use(VueMaterial)
// 给每个页面添加单独的title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// let scorll to top when change router
// if (to.path === '/') { // back to home hide top nav
//   console.log('back to home')
//   store.dispatch('backToHome')
//   window.scrollTo(0, 0)
// } else {
//   window.scrollTo(0, 0)
//   store.dispatch('leaveHome')
// }
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.path === '/') { // back to home hide top nav
    console.log('back to home')
    store.dispatch('backToHome')
  } else {
    store.dispatch('leaveHome')
  }
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
