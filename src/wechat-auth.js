/**
 * ------------------------------------------------------------------
 * 微信授权
 * @author Alex <jzsplking@gmail.com>
 * @date 18/6/8
 * ------------------------------------------------------------------
 */
class WeChatAuth {
  constructor (config) {
    let defaultConfig = {
      appid: '',
      responseType: 'code',
      scope: 'snsapi_base ',
      getCodeCallback: () => {}
    }
    this.config = Object.assign(defaultConfig, config)
  }

  setCookie (cName, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    console.log('set cookie: ', document.cookie)
  }
  // 获取cookie、
  getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    // console.log('get cookie', document.cookie.match(reg)[2])
    let arr = document.cookie.match(reg)
    if (arr) {
      return arr[2]
    } else {
      return null
    }
  }
  // 删除cookie
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }

  openAuthPage (redirectUri = encodeURIComponent(window.location.href)) {
    this.removeAccessToken()
    this.removeAuthCode()
    let authPageBaseUri = 'https://open.weixin.qq.com/connect/oauth2/authorize'
    let authParams = `?appid=${this.config.appid}&redirect_uri=${redirectUri}&response_type=${this.config.responseType}&scope=${this.config.scope}&connect_redirect=1#wechat_redirect`
    window.location.href = authPageBaseUri + authParams
  }

  setAuthCode (code) {
    if (!code) return false
    // window.sessionStorage.setItem('auth_code', code)
    // change sessionStorage to Local
    window.localStorage.setItem('auth_code', code)
    return true
  }

  getAuthCode () {
    // let codeValue = window.sessionStorage.getItem('auth_code')
    let codeValue = window.localStorage.getItem('auth_code')
    if (!codeValue) return ''
    return codeValue
  }

  removeAuthCode () {
    // window.sessionStorage.removeItem('auth_code')
    window.localStorage.removeItem('auth_code')
  }

  removeUrlCodeQuery () {
    let location = window.location
    let search = location.search
    if (search) {
      search = search.substr(1)
    }
    let href = location.origin
    let pathName = location.pathname
    if (pathName) {
      href += pathName
    }
    let searchArr = search.split('&').filter(item => {
      if (item.indexOf('code=') !== -1) {
        return false
      }
      if (item.indexOf('state=') !== -1) {
        return false
      }
      return true
    })
    if (searchArr.length > 0) {
      href += '?' + searchArr.join('&')
    }
    let hash = location.hash
    if (hash) {
      href += hash
    }
    window.location.href = href
  }

  setAccessToken (accessToken) {
    if (!accessToken) return false
    // window.localStorage.setItem('access_token', accessToken)
    // change to setCookie
    console.log('$vm: ', window.$vm)
    let jsonUserData = JSON.stringify(accessToken)
    let expireDays = 1000 * 60 * 60 * 24 * 15
    this.setCookie('wxlogin', jsonUserData, expireDays)
    return true
  }

  getAccessToken () {
    // return window.localStorage.getItem('access_token')
    // change to get cookie wxlogin
    return this.getCookie('wxlogin')
  }

  removeAccessToken () {
    // window.localStorage.removeItem('access_token')
    // change to remove cookie
    this.delCookie('wxlogin')
  }

  next (next) {
    let self = this
    return (accessToken, to) => {
      if (accessToken) {
        self.setAccessToken(accessToken)
        to ? next(to) : next()
      } else {
        self.removeAccessToken()
        to && next(to)
      }
      self.removeAuthCode()
    }
  }

  getCodeCallback (next) {
    return this.config.getCodeCallback(this.getAuthCode(), this.next(next))
  }
}

export default WeChatAuth
