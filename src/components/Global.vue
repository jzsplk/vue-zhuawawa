<script>
const client = 'new window.Paho.MQTT.client'
const hostname = '47.97.34.46'
const CMD_LEFT = 1
const CMD_RIGHT = 3
const CMD_UP = 2
const CMD_DOWN = 0
const deviceId = '22143'
const playerId = 'DEdnIOAuDOdnW+C6'
const MQTT_ACTION_SUCCESS = 'succ'
const MQTT_ACTION_FAIL = 'fail'
const MQTT_ACTION_PREPARE = 'prepare'
const MQTT_ACTION_UPDATE = 'room_update'
const MQTT_ACTION_DONE = 'done'
const MQTT_ACTION_TIMEOUT = 'timeout'
const token = '3Z5nSXNh0LswhT+IHOopvTgZrtGt21CgYXaz2NuvoiZzLX9Hso51IfOQGZpZo9Pl'

// const BASE_URL = 'https://www.iqi1.com/'
// const URL_ROOM_QUEUE = 'api/app/doll/room/queue'

export default {
  client,
  hostname,
  CMD_LEFT,
  CMD_RIGHT,
  CMD_UP,
  CMD_DOWN,
  deviceId,
  playerId,
  MQTT_ACTION_SUCCESS,
  MQTT_ACTION_FAIL,
  MQTT_ACTION_PREPARE,
  MQTT_ACTION_UPDATE,
  MQTT_ACTION_DONE,
  MQTT_ACTION_TIMEOUT,
  token
}
</script>
