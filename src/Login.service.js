// import _global from './components/Global'
// import store from './vuex/index.js'
import apiService from './API.service.js'

const UserInfo = {
  playerId: '',
  token: '',
  name: '',
  balance: 0,
  Login () {
    apiService.login().then(data => {
      console.log('login info', data)
      UserInfo.playerId = data.Id
      UserInfo.token = data.Token
      UserInfo.name = data.FirstName
      UserInfo.balance = data.Balance
      console.log('UserInfo playerId: ', UserInfo.playerId)
      console.log('UserInfo token: ', UserInfo.token)
      console.log('UserInfo 余额 : ', UserInfo.balance)
    })
  },
  getInfo (id, token) {
    UserInfo.playerId = id
    UserInfo.token = token
    console.log('getInfo token', token)
  },
  updateInfo (id, token) {
    UserInfo.playerId = id
    UserInfo.token = token
  }
}

export default UserInfo
