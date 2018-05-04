import axios from 'axios'
// import _global from './components/Global'
import store from './vuex/index.js'
// 新API地址
axios.defaults.baseURL = 'http://zhua.liehuo55.com/'
// 旧API地址
// axios.defaults.baseURL = 'https://www.iqi1.com/'
const apiService = {
  getRooms () {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room')
        .then(response => {
          resolve(response.data)
          console.log('response', response)
          console.log('response.data', response.data)
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
          console.log('response', response)
          console.log('response.data', response.data)
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
          console.log('response', response)
          console.log('response.data', response.data)
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
          console.log('response', response)
          console.log('response.data', response.data)
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
          console.log('排名数据', response)
        })
    })
  },
  login () {
    let UserInfo = {
      AppId: 'wxb4fd13a5f6f5a7c2',
      // MAC: '124578963816'
      // 修改为用户输入
      MAC: '124578963817'
    }
    return new Promise((resolve) => {
      axios.post('http://zhua.liehuo55.com/api/auth/AuthWith?RefSource=visitor', UserInfo)
        .then(response => {
          resolve(response.data)
          console.log('login response', response)
        })
    })
  }
}

export default apiService
