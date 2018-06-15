/**
 * ------------------------------------------------------------------
 * 微信授权主入口文件
 * @author Alex <jzsplking@gmail.com>
 * @date 2018/6/8
 * ------------------------------------------------------------------
 */

import WeChatAuth from './wechat-auth'
import url from 'url'
import querystring from 'querystring'

export default {
  install (Vue, options) {
    let weChatAuth = new WeChatAuth(options)
    let router = options.router
    if (!router) return false

    function urlCodeQueryFilter (code) {
      if (code) {
        weChatAuth.setAuthCode(code)
        // this remove the code and state part then redirect to it
        weChatAuth.removeUrlCodeQuery()
        // set to router push './'
        // router.push('./')
      }
    }

    function checkRouterAuth (to, from, next) {
      let authCode = weChatAuth.getAuthCode()
      // to no meta auth and no code store
      if ((!to.meta || !to.meta.auth) && !authCode) return true
      // no code store and no accessToken store and go to auth
      if (!authCode && !weChatAuth.getAccessToken()) {
        // redirect to this href as redirectURI
        weChatAuth.openAuthPage(encodeURIComponent(window.location.href))
        return false
      } else if (authCode && !weChatAuth.getAccessToken()) {
        // have code and no accessToken store
        weChatAuth.getCodeCallback(next)
        return false
      }
      return true
    }

    function beforeEach (to, from, next) {
      let query = querystring.parse(url.parse(window.location.href).query)
      let code = query.code
      urlCodeQueryFilter(code)
      if (!code && !checkRouterAuth(to, from, next)) {
        // if no code and no RouterAuth()
        return false
      }
      next()
    }

    router.beforeEach((to, from, next) => {
      beforeEach(to, from, next)
    })
  }
}
