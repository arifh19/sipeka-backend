const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://f4fa07d5:89d8ea01dd465f2f@broker.shiftr.io')

setInterval(function(){
    client.publish('sleman/kesadahan/setelah', `${Math.floor((Math.random() * 3) + 20)}`)
    client.publish('sleman/kesadahan/setelah1', `${Math.floor((Math.random() * 3) + 20)}`)
}, 2000);