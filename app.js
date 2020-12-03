const express = require('express')
const routes = require('./src/main')
const database = require('./src/config/Databases')
const bodyPraser = require('body-parser')
const morgan =  require('morgan')
const server = express()
const client = require('./src/config/Mqtt')
const port = 3000
const model = require('./src/model/Riwayat')
const cors = require('cors');
const redis = require('./src/config/Redis')
const modelNode = require('./src/model/Node')

server.use(bodyPraser.urlencoded({extended:false}))
server.use(bodyPraser.json())
server.use(morgan('dev'))
server.use(routes)
server.use(cors());

database.connect((err)=>{
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Database is connected');
})

redis.redisCheck()
    .then((res) => {
        console.log(res)
    })
    .catch((error) => {
        console.log(error)
    })

client.on('connect', async () => {
    const getTopics = await modelNode.getAll()
    const topics = JSON.parse(JSON.stringify(getTopics))
    topics.forEach(topic => {
        client.subscribe(topic.topic)
    });
    console.log("MQTT is connected")
})
// setInterval(function(){
//     client.publish('kesadahan/sebelum', `${Math.floor((Math.random() * 3) + 35)}`)
// }, 2000);

// setInterval(function(){
//     client.publish('sleman/kesadahan/setelah', `${Math.floor((Math.random() * 3) + 20)}`)
// }, 2000);

// setInterval(function(){
//     client.publish('sleman/kesadahan/setelah1', `${Math.floor((Math.random() * 3) + 20)}`)
// }, 2000);

client.on('message', async (topic, message) => {
    const getTable = await modelNode.getByTopic(topic)
    // console.log(topic)
    if (getTable.length !== 0){
        const table = JSON.parse(JSON.stringify(getTable[0])).nama.replace(/\s+/, "")
        const node_id = JSON.parse(JSON.stringify(getTable[0])).id
        const getData = await model.getAll(table)
        const data = {
            client: client,
            table: table,
            data: message.toString(),
            node_id: node_id,
        };
        model.add(data)

        redis.redisDB.keys(`riwayat-${node_id}`, (err, res) => {
            if (!err) {
                res.forEach((val) => {
                    redis.redisDB.del(val)
                })
            }
        })
        const data_redis = JSON.stringify(getData)
        redis.redisDB.set(`riwayat-${node_id}`, data_redis)
        // console.log(`${message.toString()}`)
    }
})

server.listen(port, () =>{
    console.log(`Service running on port ${port}`)
})