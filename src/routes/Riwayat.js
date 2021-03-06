const express = require('express')
const route = express.Router()
const controller = require('../controller/Riwayat')
const cache = require('../middleware/cache')

route.get('/:id', cache.getRiwayat, controller.all)
route.post('/', controller.add)
route.put('/', controller.edit)
route.delete('/', controller.delete)

module.exports = route