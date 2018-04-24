<template>
  <div id="mqttws">
  <input type="text" id="msg" v-model="msg"/>
    <input type="button" value="Send" @click="send" />
    <input type="button" value="Start" @click="start"/>
    <input type="button" value="Stop" @click="stop"/>
  </div>
</template>

<script>
  export default {
    name: 'mqttws',
    data() {
      return {
        hostname: '39.106.63.136',
        port: 443,
        clientId: 'clientId-NX75qTbKES',
        timeout: 5,
        keepAlive: 60,
        cleanSession: false,
        ssl: false,
        userName: 'hj',
        password: '123456',
        topic: '001/in',
        client:{},
        options: {},
        msg:'order',
        count:0
      }
    },
    created : function() {
      this.client = new Paho.MQTT.Client('39.106.63.136', 443, 'clientId-NX75qTbKES');
      console.log(this.client);
      var _client=this.client;
      var opt = this.options =
        {
          invocationContext: {
            host: '39.106.63.136',
            port: 443,
            path: _client.path,
            clientId: 'clientId-NX75qTbKES'
          },
          timeout: 5,
          keepAliveInterval: 50,
          cleanSession: false,
          useSSL: false,
          userName: 'hj',
          password: '123456',
          onSuccess: function() {
            console.log("onConnected");
            _client.subscribe('001/in');//订阅主题
          },
          onFailure: function (e) {
          console.log(e);
          }
        };
      this.client.connect(opt);//连接服务器并注册连接成功处理事件
      this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件

      this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
//      console.log('after onlost');
    },
//    mounted : function (){
//      var opt = this.options;
//      this.client.connect(opt);//连接服务器并注册连接成功处理事件
//      this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
//
//      this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件
//      console.log('after onlost');
//    },
    methods: {
      onConnectionLost: function (responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost:"+responseObject.errorMessage)
          console.log("连接已断开")
        }
      },
      onMessageArrived: function (message) {
        console.log("收到消息:"+message.payloadString);
      },
      onConnect : function() {
        console.log("onConnected");
        this.client.subscribe('001/in');//订阅主题
      },
      send : function (){
        var s = this.msg;
        if(s){
          s = "{time:"+new Date().Format("yyyy-MM-dd hh:mm:ss")+", content:"+(s)+", from: web console}";
          var message = new Paho.MQTT.Message(s);
          message.destinationName = this.topic;
          this.client.send(message);
          this.msg = '';
        }
      },
      start : function(){
        window.tester = window.setInterval(function(){
          if(this.client.isConnected){
            var s = "{time:"+new Date().Format("yyyy-MM-dd hh:mm:ss")+", content:"+(this.count++)+", from: web console}";
            var message = new Paho.MQTT.Message(s);
            message.destinationName = this.topic;
            this.client.send(message);
          }
        }.bind(this), 1000);
      },
      stop : function (){
        window.clearInterval(window.tester);
      }
    }
  }
</script>
<style>

</style>