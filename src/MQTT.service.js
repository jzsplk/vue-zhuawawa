import _global from './components/Global'
// import store of vuex
import store from './vuex/index.js'
// import UserInfo from './Login.service.js'
// import router from './router/index.js'

const MQTT = {
  initMqttClient (To) {
    // console.log('MQTT service', Paho)
    // console.log('MQTT store', store)
    // let hostname = '47.97.34.46'
    // open version mqtt
    // 测试MQTT地址
    // let hostname = '139.199.227.21'
    let hostname = _global.mqtthost
    // test version mqtt
    // let hostname = 'http://zhuaww.gongyou.co/weixin/'
    let port = 18000
    // 改为UUID+ 时间戳
    // let clientId = 'ult' + String(Math.round(Math.random() * 1000000))
    // UUID change to fix Id
    let clientId = String(store.state.token)
    let path = '/'
    let user = 'ultracreation'
    let pass = 'dasboot121212'
    let keepAlive = Number(5)
    let timeout = Number(5)
    let tls = false
    let cleanSession = false
    // let lastWillTopic = ''
    // let lastWillQos = 0
    // let lastWillRetain = false
    // let lastWillMessage = ''
    // 判断如果是掉线，并且没有window.client,则新建连接
    if (window.client === undefined || window.client === null) {
      window.client = new Paho.MQTT.Client(hostname, Number(port), path, clientId)
      console.info('Connecting to Server: Hostname: ', hostname, '. Port: ', port, '. Path: ', path, '. Client ID: ', clientId)
      let options = {
        invocationContext: {host: hostname, port: port, path: window.client.path, clientId: clientId},
        timeout: timeout,
        keepAliveInterval: keepAlive,
        cleanSession: cleanSession,
        useSSL: tls,
        reconnect: true,
        onSuccess: function (context) {
          console.log('Client Connected000')
          // let statusSpan = document.getElementById('connectionStatus')
          // statusSpan.innerHTML = 'Connected to: ' + context.invocationContext.host + ':' + context.invocationContext.port + context.invocationContext.path + ' as ' + context.invocationContext.clientId
          // 暂时不直接注册，进入房间再注册Topic
          // MQTT.subscribeToTopic(window.client, To)
        },
        onFailure: this.onFail
      }
      if (user.length > 0) {
        options.userName = user
      }

      if (pass.length > 0) {
        options.password = pass
      }
      window.client.onConnectionLost = this.onConnectionLost
      window.client.onMessageArrived = this.onMessageArrived
      window.client.onMessageDelivered = this.onMessageDelivered
      window.client.onConnected = this.onConnect
      window.client.connect(options)
    }
  },
  reConnect () {
    // this.initMqttClient(store._vm.roomTopic)
  },
  onConnect (context) {
    // let self = MQTT
    // console.log('self= ', self)
    // Once a connection has been made, make a subscription and send a message.
    console.log('Client Connected1111')
    // let statusSpan = document.getElementById('connectionStatus')
    // statusSpan.innerHTML = 'Connected to: ' + context.invocationContext.host + ':' + context.invocationContext.port + context.invocationContext.path + ' as ' + context.invocationContext.clientId
    // self.subscribeToTopic(window.client, MQTT.notifyTopic)
    // 这里注册到所有topic中
    // MQTT.subscribeToTopic(window.client, 'notify/#')
    console.log('MQTT infos: ', store.state.roomsInfo)
    store.state.roomsInfo.forEach(function (room) {
      MQTT.subscribeToTopic(window.client, 'notify/' + room.DeviceId)
    })
  },
  checkLastState () {
    if (store.state.roomState === 'leave') {
      // store.dispatch('showStartQueue')
    } else if (store.state.roomState === 'MqttConnected') {
      store.dispatch('showStartQueue')
    } else if (store.state.roomState === 'Prepared') {
      store.dispatch('showConfirm')
    } else if (store.state.roomState === 'Catching') {
      store.dispatch('showPanel')
    } else {
      store.dispatch('showStartQueue')
    }
  },
  onFail (context) {
    console.log('Failed to connect')
    // let statusSpan = document.getElementById('connectionStatus')
    // statusSpan.innerHTML = 'Failed to connect: ' + context.errorMessage
  },
  disconnect () {
    console.info('Disconnecting from Server')
    // window.client.disconnect()
    // var statusSpan = document.getElementById('connectionStatus')
    // statusSpan.innerHTML = 'Connection - Disconnected.'
  },
  destoryMQTT () {
    store.dispatch('leaveRoom')
    console.log('destory MQTT')
    if (window.client !== null && store._vm.roomState === 'MqttConnected') {
      if (store._vm.roomState === 'MqttConnected') {
        window.client.unsubscribe(store._vm.roomTopic)
      }
      window.client.disconnect()
    }
  },
  onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection Lost: ' + responseObject.errorMessage)
      console.log('error code: ', responseObject.errorCode)
    }
    console.log('connecting lost')
    // store.dispatch('cancelToPlay')
    // store.dispatch('showLoading')
    // 当从正在游戏状态中掉线，重新连接并把state 设置为catching
    // if (store._vm.roomState === 'Catching') {
    //   MQTT.reConnect()
    //   store.dispatch('showPanel')
    // } else if (store._vm.roomState === 'Prepared') {
    //   MQTT.reConnect()
    //   store.dispatch('showConfirm')
    // } else if (store._vm.roomState === 'MqttConnected') {
    //   MQTT.reConnect()
    // } else if (store._vm.roomState === 'loading') {
    //   MQTT.reConnect()
    // } else {
    //   MQTT.reConnect()
    // }
    // if (store._vm.roomState !== 'MqttConnected' && store._vm.roomState !== 'leave') {
    //   MQTT.reConnect()
    // }
  },
  onMessageArrived (message) {
    console.log('Message Recieved: Topic: ', message.destinationName, '. Payload: ', message.payloadString, '. QoS: ', message.qos)
    console.log(message)
    // 在这里判断destination是否是notify，本房间，如果不是 不做处理
    if (message.destinationName !== store.state.roomTopic) {
      // 只有收到成功消息，显示(即使不在房间内,也能收到玩家抓中的消息哦)
      if (JSON.parse(message.payloadString).action !== undefined && JSON.parse(message.payloadString).action === _global.MQTT_ACTION_SUCCESS) {
        MQTT.parseMQTTResults(message.payloadString, message)
      }
      console.log('payloadString', JSON.parse(message.payloadString))
      return
    }
    MQTT.parseMQTTResults(message.payloadString, message)
  },
  onMessageDelivered (token) {
    console.log('deliver complete', token.payloadString)
  },
  subscribeToTopic (client, topic) {
    let subscriptionTopic = topic
    let qos = 2
    let onSubscribeSuccess = () => {
      // show 排队按钮
      console.log('subscribe success!')
      // topic注册成功，则根据之前状态，自动切换回之前界面
      MQTT.checkLastState()
    }
    let onFailure = (errorMessage) => { console.log('subscribe fail', errorMessage) }
    console.info('Subscribing to: Topic: ', subscriptionTopic, '. QoS: ', qos)
    client.subscribe(subscriptionTopic, {qos: Number(qos), invocationContext: {}, onSuccess: onSubscribeSuccess, onFailure: onFailure})
  },
  unsubscribe () {
    window.client.unsubscribe(store._vm.roomTopic)
    console.log('unsubscribe from: ' + store._vm.roomTopic)
  },
  publishMessage (object, qos, topic) {
    let publishMessage = JSON.stringify(object)
    let retain = false
    console.info('Publishing Message: Topic: ', topic, '. QoS: ' + qos + '. Message: ', publishMessage)
    let message = new window.Paho.MQTT.Message(publishMessage)
    message.destinationName = topic
    message.qos = Number(qos)
    message.retained = retain
    window.client.send(message)
  },
  sendReadyorPassCmd (isReady, Topic) {
    let ready = {
      code: 'ready',
      id: store._vm.playerId
    }
    let pass = {
      code: 'pass',
      id: store._vm.playerId
    }
    if (isReady) {
      this.publishMessage(ready, 0, Topic)
    } else {
      this.publishMessage(pass, 0, Topic)
    }
  },
  sendControlCmd (action, param, qos, topic) {
    let object = {
      param: param,
      action: action
    }
    this.publishMessage(object, qos, topic)
  },
  sendControlEvent (type, param, topic) {
    switch (type) {
      case _global.CMD_LEFT:
        this.sendControlCmd('left', param, 0, topic)
        break
      case _global.CMD_RIGHT:
        this.sendControlCmd('right', param, 0, topic)
        break
      case _global.CMD_UP:
        this.sendControlCmd('up', param, 0, topic)
        break
      case _global.CMD_DOWN:
        this.sendControlCmd('down', param, 0, topic)
        break
    }
  },
  parseMQTTResults (json, message) {
    let self = this
    let object = JSON.parse(json)
    if (json.indexOf('action') !== -1) {
      self.parseActionResult(object, message)
    } else if (json.indexOf('code') !== -1) {
      self.parseCode(object)
    } else if (json.indexOf('error') !== -1) {
      self.parseError(object)
    }
  },
  parseActionResult (object, message) {
    let action = object.action
    console.log('parseMQTTResults action= ' + action)
    // 还原isWaiting的状态
    store.dispatch('resetWaiting')
    if (action === _global.MQTT_ACTION_SUCCESS) {
      let id = object.Id
      // 还原isWaiting的状态
      // 根据roomsInfo 获取娃娃名字,显示成功获取的娃娃名字
      let DesName = ''
      console.log(store.state.roomsInfo)
      store.state.roomsInfo.forEach(function (li) {
        if (message.destinationName.indexOf(li.DeviceId) !== -1) {
          DesName = li.Name
          return true
        }
      })
      console.log('wawa now: ', DesName)
      // 增加成功抓到的弹窗
      window.$vm.$message({
        message: '恭喜 大神 ' + object.Name + ' 抓到 ' + DesName + ',好羡慕！',
        type: 'success',
        duration: 5500,
        showClose: true
      })
      console.log('恭喜 ' + object.Name + ' 抓到了!')
      // 如果是抓娃娃成功，下一步是否是停止抓娃娃？安卓写法如此
      if (id === store._vm.playerId) {
        store.dispatch('stopCatching')
      }
    } else if (action === _global.MQTT_ACTION_FAIL) {
      // 还原isWaiting的状态

      // 触发状态概念，修改按钮内容
      let id = object.Id
      if (id === store._vm.playerId) {
        store.dispatch('showFailedConfirm')
      }
      // 增加没有抓中的弹窗
      console.log('可惜了 ' + object.Name + ' 没抓到')
      window.$vm.$message({
        message: '可惜了 ' + object.Name + '没抓到',
        duration: 3500,
        showClose: true
      })
      // 注意这里showFailedConfirm跟stopCatching的命令有冲突，不能一起用
      // if (object.Id === store._vm.playerId) {
      //   store.dispatch('stopCatching')
      // }
    } else if (action === _global.MQTT_ACTION_PREPARE) {
      let param = object.param
      let id = object.id
      console.log('preared id = ', id)
      // 如果id不一样，返回
      if (object.id !== store._vm.playerId) {
        // 如果id不一致且param为1,代表别人在抓，取别人的头像显示在屏幕左上
        if (param === 2 || param === 1) {
          // 发起api请求，获取围观所有人的头像，跟过id取得目前玩的人的头像
          console.log('code 2, id not mine, my id :', object.id)
          store.dispatch('getPlayingUrl', id)
          // 如果收到2，id不是自己，退出排队
          // store.dispatch('stopCatching')
          return
        } else {
          // store.dispatch('resetPlayingUrl')
          return
        }
      }

      if (param === 2) {
        // confirm play
        console.log('show confirm play')
        // change roomState to Prepared
        // start count down
        store.dispatch('showConfirm')
        // 10秒后自动选择取消
        // setTimeout(MQTT.sendReadyorPassCmd(false, store.state.roomTopic), 20000)
        store.dispatch('getPlayingUrl', id)
      } else if (param === 1) {
        // start catching
        console.log('start catching')
        // change roomState to Catching
        store.dispatch('showPanel')
        store.dispatch('getPlayingUrl', id)
      } else if (param === 3) {
        // is waiting
        console.log('is waiting')
      }
    } else if (action === _global.MQTT_ACTION_UPDATE) {
      // refresh room info
      console.log('refresh room info')
      // 增加刷新房间的函数，这里通过action先改变state中roomUpdating
      store.dispatch('resetPlayingUrl')
      store.dispatch('roomUpdating')
    } else if (action === _global.MQTT_ACTION_DONE) {
      let id = object.id
      // 完成动作
      console.log('id', id)
      // 停止抓娃娃
      store.dispatch('resetPlayingUrl')
      // 退出到准备状态一种情况，收到done，id为自己
      if (object.id === store._vm.playerId) {
        store.dispatch('stopCatching')
      }
    } else if (action === _global.MQTT_ACTION_TIMEOUT) {
      // time out action 判断Id是否一致
      let id = object.id
      console.log(id)
      // 停止抓娃娃,先判断id是否相同
      store.dispatch('resetPlayingUrl')
      // 退出到准备状态一种情况，收到timeout，id为自己
      if (object.id === store._vm.playerId) {
        store.dispatch('stopCatching')
      }
    }
  },
  parseCode () {

  },
  parseError () {

  },
  playStart () {
    let roomUpdate = {
      action: 'room_update'
    }
    // let prepare3 = {
    //   action: 'prepare',
    //   id: 'kFjWspD0kEfWOJCH',
    //   param: 3
    // }
    // let prepare2 = {
    //   action: 'prepare',
    //   id: 'kFjWspD0kEfWOJCH',
    //   param: 2
    // }
    // let prepare1 = {
    //   action: 'prepare',
    //   id: 'kFjWspD0kEfWOJCH',
    //   param: 1
    // }
    let query = {
      action: 'query'
    }
    // let ready = {
    //   code: 'ready',
    //   id: 'kFjWspD0kEfWOJCH'
    // }
    let start = {
      action: 'start',
      param: 0
    }
    // update
    // MQTT.publishMessage(roomUpdate, 0, MQTT.notifyTopic)
    // MQTT.publishMessage(prepare3, 0, MQTT.notifyTopic)
    MQTT.publishMessage(roomUpdate, 0, MQTT.notifyTopic)
    MQTT.publishMessage(query, 0, MQTT.ctrlTopic)
    // // MQTT.publishMessage({action: '34', code: '3400', param: '00'}, 0, MQTT.notifyTopic)
    // MQTT.publishMessage(prepare2, 0, MQTT.notifyTopic)
    MQTT.sendReadyorPassCmd()
    MQTT.publishMessage(start, 0, MQTT.ctrlTopic)
    // MQTT.publishMessage(prepare1, 0, MQTT.notifyTopic)
    // start move
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'right'}, 0, MQTT.ctrlTopic)
    MQTT.publishMessage({param: 250, action: 'up'}, 0, MQTT.ctrlTopic)
  }
}

export default MQTT
