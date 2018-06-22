<script>
const client = 'new window.Paho.MQTT.client'
// const hostname = '47.97.34.46' // MQTT open versionip
// const hostname = 'https://www.liehuo55.com/' // open version api
// const mqtthost = '47.97.34.46' // MQTT open verion ip
// const appid = 'wx229fb7a27a20b375' // open version Appid
const hostname = 'http://139.199.227.21/' // api test versionIP
const mqtthost = '139.199.227.21' // MQTT open verion ip
const appid = 'wxc73411932a4d884e' // test version appid
const CMD_LEFT = 1
const CMD_RIGHT = 3
const CMD_UP = 2
const CMD_DOWN = 0
// 游客id，token
const playerId = 'DEdnIOAuDOdnW+C6'
const token = '3Z5nSXNh0LswhT+IHOopvTgZrtGt21CgYXaz2NuvoiZzLX9Hso51IfOQGZpZo9Pl'
// 微信id， Token
// const playerId = 'kFjWspD0kEfWOJCH'
// const token = 'dkVytEvQvBf1tHoaouJY4JwWAvyQaL42ihHPsvBdcLIuinvFXe+/tN5hTcC4qZig'
const MQTT_ACTION_SUCCESS = 'succ'
const MQTT_ACTION_FAIL = 'fail'
const MQTT_ACTION_PREPARE = 'prepare'
const MQTT_ACTION_UPDATE = 'room_update'
const MQTT_ACTION_DONE = 'done'
const MQTT_ACTION_TIMEOUT = 'timeout'

// const BASE_URL = 'https://www.iqi1.com/'
// const URL_ROOM_QUEUE = 'api/app/doll/room/queue'
// 支付完成请求数据
const host1 = 'http://zhuaww.gongyou.co/weixin/payresult'
// 请求商品列表
const host2 = 'http://zhuaww.gongyou.co/weixin/getprice'
// 请求调用微信支付数据接口
const host3 = 'http://zhuaww.gongyou.co/weixin/buydiamond'
const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=http%3a%2f%2fzhuaww.gongyou.co%2fweixin%2fpayment&response_type=code&scope=snsapi_base&state=123#wechat_redirect'

export default {
  client,
  hostname,
  mqtthost,
  CMD_LEFT,
  CMD_RIGHT,
  CMD_UP,
  CMD_DOWN,
  playerId,
  MQTT_ACTION_SUCCESS,
  MQTT_ACTION_FAIL,
  MQTT_ACTION_PREPARE,
  MQTT_ACTION_UPDATE,
  MQTT_ACTION_DONE,
  MQTT_ACTION_TIMEOUT,
  token,
  host1,
  host2,
  host3,
  url,
  appid
}
</script>
