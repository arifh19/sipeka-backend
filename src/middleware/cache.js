const redis = require('../config/Redis')
const response = require('../helper/response')

const cache = {}

cache.getAll = (req, res, next) => {
    redis.redisDB.get(req.originalUrl, (err, data) => {
        if (err) {
            return response(res, 500, 'Error', err)
        } else if (data !== null) {
            const results = JSON.parse(data)
            return response(res, 200, 'List Data', results)
        } else {
            next()
        }
    })
}

cache.getRiwayat = (req, res, next) => {
    redis.redisDB.get(`riwayat-${req.params.id}`, (err, data) => {
        if (err) {
            return response(res, 500, 'Error', err)
        } else if (data !== null) {
            const results = JSON.parse(data)
            return response(res, 200, 'List Data', results)
        } else {
            next()
        }
    })
}

module.exports = cache