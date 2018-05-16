import '../static/jsmpeg.min.js'
import store from './vuex/index.js'

const playVideo = {
  play (url) {
    // this.loadVideo()
    let canvas = document.getElementById('video-canvas')
    // let playUrl = 'ws://' + url + ':8084/'
    console.log('playing', url)
    console.log('play token: ', store._vm.token)
    let newUrl = url.replace(/{%token%}/, encodeURIComponent(store._vm.token))
    console.log('new_url', newUrl)
    let url1 = 'ws://' + '47.97.25.165' + ':8084/'
    // var url = 'ws://'+document.location.hostname+':8084/';
    // eslint-disable-next-line
    let player = new JSMpeg.Player(url1, {canvas: canvas})
  },
  wsPlay (ctx, url) {
    let uri = 'ws://' + url
    console.log('playing :' + uri)
    if (window.wsavc === undefined || window.wsavc === null) {
      console.log('new wsavc')
      window.wsavc = new WSAvcPlayer(ctx, 'webgl', 1, 35)
      console.log(window.wsavc)
      window.wsavc.connect(url)
    } else {
      // window.wsavc.stopStream()
      // window.wsavc.disconnect()
      // window.wsavc = null
      setTimeout(function () {
        // window.wsavc = new WSAvcPlayer(window.canvas, 'webgl', 1, 35)
        window.wsavc.connect(url, ctx)
      }, 500)
    }
  },
  wsRePlay (url) {
    console.log('重新播放')
    window.wsavc.stopStream()
    window.wsavc.disconnect()
    // window.wsavc = null
    setTimeout(function () {
      // window.wsavc = new WSAvcPlayer(window.canvas, 'webgl', 1, 35)
      window.wsavc.connect(url)
    }, 500)
  },
  wsDisconnect () {
    window.wsavc.stopStream()
    window.wsavc.disconnect()
  }
}

export default playVideo
