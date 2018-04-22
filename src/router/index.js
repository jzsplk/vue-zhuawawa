import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import RoomPlay from '@/components/RoomPlay'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
        auth: true
      }
    },
    {
      path: '/play',
      name: 'Play',
      component: RoomPlay
    }
  ]
})
