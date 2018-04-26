<script>
const client = 'new window.Paho.MQTT.client'
const hostname = '47.97.34.46'
const CMD_LEFT = 1
const CMD_RIGHT = 3
const CMD_UP = 2
const CMD_DOWN = 0
const deviceId = '22371'
const playerId = 'kFjWspD0kEfWOJCH'
const MQTT_ACTION_SUCCESS = 'succ'
const MQTT_ACTION_FAIL = 'fail'
const MQTT_ACTION_PREPARE = 'prepare'
const MQTT_ACTION_UPDATE = 'room_update'
const MQTT_ACTION_DONE = 'done'
const MQTT_ACTION_TIMEOUT = 'timeout'

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
  MQTT_ACTION_TIMEOUT
}
</script>
