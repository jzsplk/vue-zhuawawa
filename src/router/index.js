import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import RoomPlay from '@/components/RoomPlay'
import Login from '@/components/Login'
import Mydoll from '@/components/Mydoll'
import MyInfo from '@/components/MyInfo'
import Pay from '@/components/Pay'
import Address from '@/components/Address'

Vue.use(Router)

// 获取目前路由路径
function getAbsolutePath () {
  let path = location.pathname
  console.log('absolutePath', path.substring(0, path.lastIndexOf('/') + 1))
  return path.substring(0, path.lastIndexOf('/') + 1)
}

export default new Router({
  mode: 'history',
  base: getAbsolutePath(), // 设置获取的绝对路由
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vue',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Hello',
      meta: {
        auth: true,
        keepAlive: false
      }
    },
    {
      path: '/Tulogin',
      name: 'Login',
      component: Login
    },
    {
      path: '/play/',
      name: 'Play',
      component: RoomPlay
    },
    {
      path: '/mydoll',
      name: 'Mydoll',
      component: Mydoll
    },
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: MyInfo
    },
    {
      path: '/payment',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/address',
      name: 'address',
      component: Address
    }
  ]
})
