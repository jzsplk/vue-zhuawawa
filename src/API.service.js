import axios from 'axios'
// import _global from './components/Global'
import store from './vuex/index.js'
import _global from './components/Global'
// 新API地址
// axios.defaults.baseURL = 'https://www.liehuo55.com/'
// axios.defaults.baseURL = 'http://139.199.227.21/'
axios.defaults.baseURL = _global.hostname
// axios.defaults.baseURL = 'http://zhuaww.gongyou.co/weixin/'
// 旧API地址
// axios.defaults.baseURL = 'https://www.iqi1.com/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const apiService = {
  getRooms () {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room')
        .then(response => {
          resolve(response.data)
          console.log('get Rooms response', response)
          console.log('get Rooms response.data', response.data)
        })
    })
  },
  getRoomInfo (id) {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room?Id=' + encodeURIComponent(id) + '&', {
        headers: {
          'Authorization': 'Base ' + store._vm.token
          // 改为由state获取token
        }
      })
        .then(response => {
          resolve(response.data)
          console.log(' getRoomInfo response.data', response.data)
          // 执行action，把目前所有玩家的数据存到store中
          store.dispatch('getCrowds', response.data)
        })
    })
  },
  enterRoom (id) {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room/enter?Id=' + encodeURIComponent(id) + '&', {
        headers: {
          'Authorization': 'Base ' + store._vm.token
          // 改为由state获取token
        }
      })
        .then(response => {
          resolve(response)
          console.log('enterRoom response', response)
          console.log('enterRoom response.data', response.data)
        })
    })
  },
  leaveRoom (id) {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room/leave?Id=' + encodeURIComponent(id) + '&', {
        headers: {
          // 改为由state获取token
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response.data)
          console.log('leaveRoom response', response)
          console.log('leaveRoom response.data', response.data)
        })
    })
  },
  queueToPlay (id) {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room/queue?Id=' + encodeURIComponent(id) + '&', {
        headers: {
          // 改为由state获取token
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          console.log('queue response', response)
          resolve(response.data)
          console.log('queue response.data', response.data)
        }).catch(e => {
          console.log('queue error:', e)
          // 如果412错误，显示余额不足
          if (String(e).indexOf('412') !== -1) {
            store.dispatch('InsufficientBalance')
          } else if (String(e).indexOf('401') !== -1) {
            // 显示请登陆
            console.log('请登陆')
          } else {
            // 如果其他情况，先退出排队
            store.dispatch('stopCatching')
          }
        })
    })
  },
  leaveQueue (id) {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room/leaveQueue?Id=' + encodeURIComponent(id) + '&', {
        headers: {
          // 改为由state获取token
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response.data)
          console.log('response', response)
          console.log('response.data', response.data)
        })
    })
  },
  getRoomRank (id) {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room/caughtInfo?Id=' + encodeURIComponent(id) + '&', {
        headers: {
          // 改为由state获取token
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
        })
    })
  },
  getBilling (isLoadmore, countOffset, pageCount) { // need to add offset to support loadmore
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: axios.defaults.baseURL + 'api/balance/log' + '?Offset=' + countOffset + '&Count=' + pageCount,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('get billing history list', response)
        })
    })
  },
  // 修改login函数接受一个name参数，接受Login.vue中输入的名字
  login (name) {
    let UserInfo = {
      AppId: 'wxb4fd13a5f6f5a7c2',
      // MAC: '124578963816'
      // 修改为用户输入
      MAC: String(name),
      Terminal: 'H5'
    }
    return new Promise((resolve) => {
      axios.post('api/auth/AuthWith?RefSource=visitor', UserInfo)
        .then(response => {
          resolve(response.data)
          console.log('login response', response)
        })
    })
  },
  WechatLogin () {
    window.params1 = {
      'AppId': 'wx229fb7a27a20b375',
      'Code': 123,
      'state': '',
      'os': 'H5'
    }
    JSON.stringify(window.params1)
    console.log('新参数2', JSON.stringify(window.params1))
    axios.post(axios.defaults.baseURL + 'api/auth/AuthWith?RefSource=wechat', {
      'AppId': 'wx229fb7a27a20b375',
      'Code': 'code',
      'state': '',
      'os': 'H5'
    }
    ).then(response => {
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
  },
  getUserBalance () {
    return new Promise((resolve) => {
      axios.get('api/balance', {
        headers: {
          // 改为由state获取token
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('user balance', response)
        })
    })
  },
  getUserGifts () {
    return new Promise((resolve) => {
      axios.get('api/gift', {
        headers: {
          // 改为由state获取token
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('user gifts', response)
        })
    })
  },
  // 兑换券请求  JSON.parse(JSON.stringify(UserCode))
  // axios.defaults.baseURL.substring(0, axios.defaults.baseURL.length - 1) + ':15359/exchange/'
  postCoupon (code) {
    // 更改post写法
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: 'http://zhuaww.gongyou.co/weixin/exchange/',
        data: {
          ExchangeCode: code
        },
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('post Coupon response', response)
        })
        .catch(error => {
          console.log('coupen error', error)
        })
    })
  },
  // 商品列表获取
  getPayList (json) {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: _global.host2,
        data: json,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('get Pay list', response)
        })
        .catch(error => {
          console.log('get Paylist error', error)
        })
    })
  },
  getPostage (json) { // 获取发货邮费接口
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: axios.defaults.baseURL + 'api/receipt/postage',
        data: {
          Gifts: json
        },
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('get postage', response)
        })
        .catch(error => {
          console.log('get postage error', error)
        })
    })
  },
  deliverGifts (json, address) { // 申请发货接口
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: axios.defaults.baseURL + 'api/receipt/ImportGift',
        data: {
          Gifts: json,
          ToAddress: address
        },
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('request delivery success', response)
        })
        .catch(error => {
          console.log('request delivery error', error)
          this.$message('余额不足请充值')
        })
    })
  },
  // 请求微信支付接口
  requestWePay (json) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: _global.host3,
        data: json,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('get Pay request', response)
        })
        .catch(error => {
          console.log('get Pay request error', error)
        })
    })
  },
  // 获取用户存储的地址
  getAddressList () {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: axios.defaults.baseURL + 'api/addr',
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('get address list', response)
        })
        .catch(error => {
          console.log('get address list address error', error)
        })
    })
  },
  // 增加用户地址
  appendAddress (json) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: axios.defaults.baseURL + 'api/addr/append',
        data: json,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('append address', response)
        })
        .catch(error => {
          console.log('gappend address error', error)
        })
    })
  },
  deleteAddress (id) { // 删除邮寄地址
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: axios.defaults.baseURL + 'api/addr/remove',
        data: id,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('remove address', response)
        })
        .catch(error => {
          console.log('remove address error', error)
        })
    })
  },
  setDefAddress (json) { // 设置默认地址
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: axios.defaults.baseURL + 'api/addr/def',
        data: json,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('set def address', response)
        })
        .catch(error => {
          console.log('set def error', error)
        })
    })
  },
  updateAddress (json) { // 修改地址
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url: axios.defaults.baseURL + 'api/addr/update',
        data: json,
        headers: {
          'Authorization': 'Base ' + store._vm.token
        }
      })
        .then(response => {
          resolve(response)
          console.log('update def address', response)
        })
        .catch(error => {
          console.log('update def error', error)
        })
    })
  }
}

export default apiService
