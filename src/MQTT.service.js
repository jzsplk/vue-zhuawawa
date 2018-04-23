import '../static/paho-mqtt.js'

const MQTT = {
  connect () {
    console.log('mqtt running')
  },
  initMQTTClient () {
    let hostname = ''
    let port = 18000
    let clientId = 'xc'
    let path = '/'
    let user = 'gamesvr'
    let pass = '2018gsv0308'
    let keepAlive = 60
    let timeout = 3
    let tls = false
    let cleanSession = true
    let lastWillTopic = ''
    let lastWillQos = 0
    let lastWillRetain = false
    let lastWillMessage = '1'

    if (path.length > 0) {
      client = new Paho.MQTT.Client(hostname, Number(port), path, clientId)
    } else {
      client = new Paho.MQTT.Client(hostname, Number(port), clientId)
    }
    console.info('Connecting to Server: Hostname: ', hostname, '. Port: ', port, '. Path: ', client.path, '. Client ID: ', clientId)

    //set callback handlers
    client.onConnectionLost = onConnectionLost
    client.onMessageArrived = onMessageArrived

    let option = {
      invocationContext: {host: hostname, port: port, path: client.path, clientId: clientId},
      timeout: timeout,
      keepAliveInterval: keepAlive,
      cleanSession: cleanSession,
      useSSL: tls,
      onSuccess: onConnect,
      onFailure: onFail
    }

    if (user.length > 0) {
      option.userName = user
    }

    if (pass.length > 0) {
      option.password = pass
    }

    if (lastWillTopic.length > 0) {
      let lastWillMessage = new Paho.MQTT.Message(lastWillMessage);
      lastWillMessage.destinationName = lastWillTopic;
      lastWillMessage.qos = lastWillQos;
      lastWillMessage.retained = lastWillRetain;
      options.willMessage = lastWillMessage;
    }

    //  connect th client
    client.connect(options);
    var statusSpan = document.getElementById("connectionStatus");
    statusSpan.innerHTML = 'Connecting...';

  }
}

export default MQTT
