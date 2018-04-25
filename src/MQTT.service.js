import _global from './components/Global'
const MQTT = {
  initMqttClient () {
    console.log('MQTT service', Paho)
    let hostname = '47.97.34.46'
    let port = 18000
    let clientId = 'xc' + String(Math.round(Math.random() * 1000))
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
    console.log('global Paho', Paho)
    let options = {
      invocationContext: {host: hostname, port: port, path: window.client.path, clientId: clientId},
      timeout: timeout,
      keepAliveInterval: keepAlive,
      cleanSession: cleanSession,
      useSSL: tls,
      onSuccess: this.onConnect,
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
  },
  say () {
    console.log('say', 'hi')
    console.log(_global.CMD_UP)
  },
  onConnect (context) {
    // Once a connection has been made, make a subscription and send a message.
    console.log('Client Connected')
    let statusSpan = document.getElementById('connectionStatus')
    statusSpan.innerHTML = 'Connected to: ' + context.invocationContext.host + ':' + context.invocationContext.port + context.invocationContext.path + ' as ' + context.invocationContext.clientId
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
    console.log(message)
  },
  subscribeToTopic (c) {
    let subscriptionTopic = 'notify/' + _global.deviceId
    let qos = 2
    console.info('Subscribing to: Topic: ', subscriptionTopic, '. QoS: ', qos)
    c.subscribe(subscriptionTopic, {qos: Number(qos)})
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
  sendReadyorPassCmd () {
    let object = {
      code: 'ready',
      id: ''
    }
    this.publishMessage(object, 0, 'ctrl/' + _global.deviceId)
  },
  sendControlCmd (action, param, qos) {
    let object = {
      param: param,
      action: action
    }
    this.publishMessage(object, qos, 'ctrl/' + _global.deviceId)
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
  }

}

export default MQTT
