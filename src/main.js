const express = require('express')
const routes = express.Router()
const riwayat = require('./routes/Riwayat')
const node = require('./routes/Node')

routes.use('/riwayat', riwayat)
routes.use('/node', node)

module.exports = routes