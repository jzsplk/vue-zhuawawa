import _global from './components/Global'
import apiService from './API.service.js'

const WePay = {
  play (hData) {
    let packageId = 'prepay_id=' + hData.prepay_id
    let sendData = {
      'appId': hData.appid, // 公众号名称，由商户传入
      'timeStamp': hData.timeStamp, // 时间戳，自1970年以来的秒数
      'nonceStr': hData.nonce_str, // 随机串
      'package': packageId,
      'signType': 'MD5', // 微信签名方式：
      'paySign': hData.paySign // 微信签名
    }
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
      console.log(_global.host1)
    }
    /* eslint-disable */
    function onBridgeReady () {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        sendData,
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') { // 判断微信支付结果后动作
            console.log('微信支付成功')
          }
        }
      )
    }
    /* eslint-enable */
  },
  getPayList () {
    apiService.getPayList().then(res => {
      // 请求商品列表，商品在res.data
      console.log('pay list data', res)
    })
  }
}

export default WePay
