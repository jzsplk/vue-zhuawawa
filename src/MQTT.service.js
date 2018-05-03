import _global from './components/Global'

const MQTT = {
  notifyTopic: 'notify/' + _global.deviceId,
  ctrlTopic: 'ctrl/' + _global.deviceId,
  initMqttClient (To) {
    console.log('MQTT service', Paho)
    let hostname = '47.97.34.46'
    let port = 18000
    let clientId = 'ult' + String(Math.round(Math.random() * 1000))
    let path = '/'
    let user = 'ultracreation'
    let pass = 'dasboot121212'
    let keepAlive = Number(60)
    let timeout = Number(5)
    let tls = false
    let cleanSession = true
    // let lastWillTopic = ''
    // let lastWillQos = 0
    // let lastWillRetain = false
    // let lastWillMessage = ''
    console.info('Connecting to Server: Hostname: ', hostname, '. Port: ', port, '. Path: ', path, '. Client ID: ', clientId)
    window.client = new Paho.MQTT.Client(hostname, Number(port), path, clientId)
    let options = {
      invocationContext: {host: hostname, port: port, path: window.client.path, clientId: clientId},
      timeout: timeout,
      keepAliveInterval: keepAlive,
      cleanSession: cleanSession,
      useSSL: tls,
      onSuccess: function (context) {
        console.log('Client Connected')
        let statusSpan = document.getElementById('connectionStatus')
        statusSpan.innerHTML = 'Connected to: ' + context.invocationContext.host + ':' + context.invocationContext.port + context.invocationContext.path + ' as ' + context.invocationContext.clientId
        MQTT.subscribeToTopic(window.client, To)
      },
      onFailure: this.onFail
    }
    if (user.length > 0) {
      options.userName = user
    }

    if (pass.length > 0) {
      options.password = pass
    }
    window.client.connect(options)
    window.client.onConnectionLost = this.onConnectionLost
    window.client.onMessageArrived = this.onMessageArrived
    window.client.onMessageDelivered = this.onMessageDelivered
  },
  say () {
    console.log('say', 'hi')
    console.log(_global.CMD_UP)
  },
  onConnect (context) {
    let self = MQTT
    console.log('self= ', self)
    // Once a connection has been made, make a subscription and send a message.
    console.log('Client Connected')
    let statusSpan = document.getElementById('connectionStatus')
    statusSpan.innerHTML = 'Connected to: ' + context.invocationContext.host + ':' + context.invocationContext.port + context.invocationContext.path + ' as ' + context.invocationContext.clientId
    self.subscribeToTopic(window.client, MQTT.notifyTopic)
  },
  onFail (context) {
    console.log('Failed to connect')
    let statusSpan = document.getElementById('connectionStatus')
    statusSpan.innerHTML = 'Failed to connect: ' + context.errorMessage
  },
  disconnect () {
    console.info('Disconnecting from Server')
    window.client.disconnect()
    var statusSpan = document.getElementById('connectionStatus')
    statusSpan.innerHTML = 'Connection - Disconnected.'
  },
  onConnectionLost (responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('Connection Lost: ' + responseObject.errorMessage)
    }
  },
  onMessageArrived (message) {
    console.log('Message Recieved: Topic: ', message.destinationName, '. Payload: ', message.payloadString, '. QoS: ', message.qos)
    // console.log(message)
    MQTT.parseMQTTResults(message.payloadString)
  },
  onMessageDelivered (token) {
    console.log('deliver complete', token.payloadString)
  },
  subscribeToTopic (c, topic) {
    let subscriptionTopic = topic
    let qos = 2
    let onSubscribeSuccess = () => { console.log('subscribe success!') }
    let onFailure = (errorMessage) => { console.log('subscribe fail', errorMessage) }
    console.info('Subscribing to: Topic: ', subscriptionTopic, '. QoS: ', qos)
    c.subscribe(subscriptionTopic, {qos: Number(qos), invocationContext: {}, onSuccess: onSubscribeSuccess, onFailure: onFailure})
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
  sendReadyorPassCmd (isReady) {
    let ready = {
      code: 'ready',
      id: _global.playerId
    }
    let pass = {
      code: 'pass',
      id: _global.playerId
    }
    if (isReady) {
      this.publishMessage(ready, 0, MQTT.ctrlTopic)
    } else {
      this.publishMessage(pass, 0, MQTT.ctrlTopic)
    }
  },
  sendControlCmd (action, param, qos) {
    let object = {
      param: param,
      action: action
    }
    this.publishMessage(object, qos, MQTT.ctrlTopic)
  },
  sendControlEvent (type, param) {
    switch (type) {
      case _global.CMD_LEFT:
        this.sendControlCmd('left', param, 0)
        break
      case _global.CMD_RIGHT:
        this.sendControlCmd('right', param, 0)
        break
      case _global.CMD_UP:
        this.sendControlCmd('up', param, 0)
        break
      case _global.CMD_DOWN:
        this.sendControlCmd('down', param, 0)
        break
    }
  },
  parseMQTTResults (json) {
    let self = this
    let object = JSON.parse(json)
    if (json.indexOf('action') !== -1) {
      self.parseActionResult(object)
    } else if (json.indexOf('code') !== -1) {
      self.parseCode(object)
    } else if (json.indexOf('error') !== -1) {
      self.parseError(object)
    }
  },
  parseActionResult (object) {
    let action = object.action
    console.log('parseMQTTResults action= ' + action)
    if (action === _global.MQTT_ACTION_SUCCESS) {
      console.log('恭喜 抓到了')
    } else if (action === _global.MQTT_ACTION_FAIL) {
      console.log('可惜了， 没抓到')
    } else if (action === _global.MQTT_ACTION_PREPARE) {
      let param = object.param
      let id = object.id
      console.log('id = ', id)
      if (param === 2) {
        // confirm play
        console.log('show confirm play')
      } else if (param === 1) {
        // start catching
        console.log('start catching')
      } else if (param === 3) {
        // is waiting
        console.log('is waiting')
      }
    } else if (action === _global.MQTT_ACTION_UPDATE) {
      // refresh room info
      console.log('refresh room info')
    } else if (action === _global.MQTT_ACTION_DONE) {
      let id = object.id
      // 完成动作
      console.log('id', id)
    } else if (action === _global.MQTT_ACTION_TIMEOUT) {
      // time out action
      let id = object.id
      console.log(id)
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
