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
import AddAddress from '@/components/Address-Add'
import Delivery from '@/components/Mydoll-delivery'
import Billing from '@/components/Bill'
import Guide from '@/components/Guide'
import FeedBack from '@/components/MyInfo-feedback'
import Setting from '@/components/MyInfo-setting'
import Coupon from '@/components/MyInfo-coupon'
import Question from '@/components/MyInfo-questions'
import WxLoading from '@/components/WxLoading'
import ChargeRank from '@/components/ChargeRank'

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
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '最爱抓娃娃'
      }
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
      component: Mydoll,
      meta: {
        title: '我的娃娃'
      }
    },
    {
      path: '/myinfo',
      name: 'MyInfo',
      component: MyInfo,
      meta: {
        title: '我的背包'
      }
    },
    {
      path: '/payment',
      name: 'Pay',
      component: Pay,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/address',
      name: 'address',
      component: Address,
      meta: {
        title: '发货地址'
      }
    },
    {
      path: '/add-address',
      name: 'add-address',
      component: AddAddress,
      meta: {
        title: '添加发货地址'
      }
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery
    },
    {
      path: '/billing',
      name: 'billing',
      component: Billing,
      meta: {
        title: '娃娃币账单'
      }
    },
    {
      path: '/guide',
      name: 'guide',
      component: Guide,
      meta: {
        title: '向导'
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: FeedBack,
      meta: {
        title: '问题反馈'
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {
        title: '设置'
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: Coupon,
      meta: {
        title: '兑换码'
      }
    },
    {
      path: '/questions',
      name: 'questions',
      component: Question,
      meta: {
        title: '常见问题'
      }
    },
    {
      path: '/wxloading',
      name: 'wxloading',
      component: WxLoading,
      meta: {
        title: '微信登陆中'
      }
    },
    {
      path: '/chargeRank',
      name: 'chargeRank',
      component: ChargeRank,
      meta: {
        title: '充值排行榜'
      }
    }
  ]
})
