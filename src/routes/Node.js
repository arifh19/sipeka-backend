const express = require('express')
const route = express.Router()
const controller = require('../controller/Node')
const cache = require('../middleware/cache')

route.get('/', cache.getAll, controller.all)
route.post('/', controller.add)
route.put('/', controller.edit)
route.delete('/:id', controller.delete)

module.exports = route