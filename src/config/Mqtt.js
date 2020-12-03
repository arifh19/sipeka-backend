const mqtt = require('mqtt')
const serverMqtt = process.env.MQTT || 'mqtt://f4fa07d5:89d8ea01dd465f2f@broker.shiftr.io'
const client = mqtt.connect(serverMqtt)

module.exports = client