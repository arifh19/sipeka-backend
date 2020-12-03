const model = require('../model/Riwayat')
const modelNode = require('../model/Node')
const response = require('../helper/response')
const validator = require('../helper/validator')
const redis = require('../config/Redis')

const Riwayat = {}

Riwayat.all = async (req, res) => {
    try {
        let message
        const id = req.params.id
        const getTable = await modelNode.getById(id)
        if (getTable.length === 0) {
            message = 'Node is not defined'
            return response(res, 200, message, {})
        }
        const table = JSON.parse(JSON.stringify(getTable[0])).nama.replace(/\s+/, "")
        const data = await model.getAll(table)
        
        if (data.length === 0) {
            message = 'No Data'
        } else {
            message = 'List Data'
        }
        const data_redis = JSON.stringify(data)
        redis.redisDB.set(`riwayat-${id}`, data_redis)
        return response(res, 200, message, data)

    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Riwayat.add = async (req, res) => {
    try {
        const getTable = await modelNode.getById(req.body.node_id)
        if (getTable.length === 0) {
            message = 'Node is not defined'
            return response(res, 200, message, {})
        }
        const table = JSON.parse(JSON.stringify(getTable[0])).nama.replace(/\s+/, "")
        const data = {
            table: table,
            data: req.body.data,
            node_id: req.body.node_id,
        };
        
        const errors = validator.addHistory(data)

        if (errors) {
            return response(res, 400, 'Error', errors)
        }
        const results = await model.add(data)
        
        return response(res, 201, 'History added successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Riwayat.edit = async (req, res) => {
    try {
        const data = {
            id: req.body.id,
            data: req.body.data,
            node_id: req.body.node_id,
        };
        
        const errors = validator.editHistory(data)

        if (errors) {
            return response(res, 400, 'Error', errors)
        }
        const results = await model.edit(id, name)
        return response(res, 200, 'History updated successfully', results)

    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}

Riwayat.delete = async (req, res) => {
    try {
        const {
            id
        } = req.body
        const errors = validator.deleteHistory(data)

        if (errors) {
            return response(res, 400, 'Error', errors)
        }
        
        const results = await model.delete(id)

        return response(res, 200, 'History deleted successfully', results)
    } catch (error) {
        return response(res, 500, 'Error', error)
    }
}
module.exports = Riwayat