const express = require('express')
const routes = require('./src/main')
const database = require('./src/config/Databases')
const bodyPraser = require('body-parser')
const morgan =  require('morgan')
const mqtt = require('mqtt')
const server = express()
const client = mqtt.connect('mqtt://f4fa07d5:89d8ea01dd465f2f@broker.shiftr.io')
const port = 13000
const model = require('./src/model/Riwayat')
const cors = require('cors');

server.use(bodyPraser.urlencoded({extended:false}))
server.use(bodyPraser.json())
server.use(morgan('dev'))
server.use(routes)
server.use(cors({origin: 'http://localhost:13000'}));

database.connect((err)=>{
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database connected');
})

client.on('connect', () => {
  client.subscribe('kesadahan/sebelum')
  client.subscribe('kesadahan/setelah')
//   client.subscribe('sipeka/kesadahan/setelah')
  console.log("connected")

})
setInterval(function(){
    client.publish('kesadahan/sebelum', `${Math.floor((Math.random() * 3) + 35)}`)
}, 2000);


setInterval(function(){
    client.publish('kesadahan/setelah', `${Math.floor((Math.random() * 3) + 20)}`)
}, 2000);

client.on('message', (topic, message) => {
  switch (topic) {
    case 'kesadahan/sebelum':
        console.log(`${message.toString()}`)
        break
    case 'kesadahan/setelah':
        model.add(message.toString())
        console.log(`${message.toString()}`)
        break
    }
})

server.listen(port, () =>{
    console.log(`Service running on port ${port}`)
})