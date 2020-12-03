const model = require('../model/Node')
const response = require('../helper/response')
const validator = require('../helper/validator')
const redis = require('../config/Redis')
const client = require('../config/Mqtt')

const Node = {}

Node.all = async (req, res) => {
    try {
        const data = await model.getAll()
        let message
        if (data.length === 0) {
            message = 'No Data'
        } else {
            message = 'List Data'
        }
        const data_redis = JSON.stringify(data)
        redis.redisDB.set(req.originalUrl, data_redis)
        
        return response(res, 200, message, data)

    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Node.add = async (req, res) => {
    try {
        const data = {
            nama: req.body.nama,
            topic: req.body.topic,
        };

        const errors = validator.addNode(data)

        if (errors) {
            return response(res, 400, 'Error', errors)
        }
        const checkUnique = await model.get(data)
        
        if (checkUnique.length > 0) {
            return response(res, 400, 'Nama node sudah pernah digunakan', errors)
        }
        const results = await model.add(data)
        redis.redisDB.keys(`${req.baseUrl}*`, (err, res) => {
            if (!err) {
                res.forEach((val) => {
                    redis.redisDB.del(val)
                })
            }
        })
        const data_redis = JSON.stringify(results)
        redis.redisDB.set(req.originalUrl, data_redis)
        client.subscribe(data.topic)
        return response(res, 201, 'Node added successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Node.edit = async (req, res) => {
    try {
        const getTable = await model.getById(req.body.id)
        const old_table = JSON.parse(JSON.stringify(getTable[0])).nama.replace(/\s+/, "")
        const old_topic = JSON.parse(JSON.stringify(getTable[0])).topic
        const data = {
            id: req.body.id,
            nama: req.body.nama,
            topic: req.body.topic,
            old_table: old_table,
        };
        
        const errors = validator.editNode(data)

        if (errors) {
            return response(res, 400, 'Error', errors)
        }
        const results = await model.edit(data)
        redis.redisDB.keys(`${req.baseUrl}*`, (err, res) => {
            if (!err) {
                res.forEach((val) => {
                    redis.redisDB.del(val)
                })
            }
        })
        const data_redis = JSON.stringify(results)
        redis.redisDB.set(req.originalUrl, data_redis)

        if (old_table !== data.topic){
            client.unsubscribe(old_topic)
            client.subscribe(data.topic)
        }
        
        return response(res, 200, 'Node updated successfully', results)

    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Node.delete = async (req, res) => {
    try {
        const id = req.params.id
        const getTable = await model.getById(id)
        const table = JSON.parse(JSON.stringify(getTable[0])).nama.replace(/\s+/, "")
        const old_topic = JSON.parse(JSON.stringify(getTable[0])).topic

        const data = {
            id: id,
            table: table,
        };
        const errors = validator.deleteNode(data)

        if (errors) {
            return response(res, 400, 'Error', errors)
        }
        
        const results = await model.delete(data)
        redis.redisDB.keys(`${req.baseUrl}*`, (err, res) => {
            if (!err) {
                res.forEach((val) => {
                    redis.redisDB.del(val)
                })
            }
        })
        const data_redis = JSON.stringify(results)
        redis.redisDB.set(req.originalUrl, data_redis)
        client.unsubscribe(old_topic)
        return response(res, 200, 'Node deleted successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}
module.exports = Node