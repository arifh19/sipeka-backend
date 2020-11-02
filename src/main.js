const express = require('express')
const routes = express.Router()
const riwayat = require('./routes/Riwayat')

routes.use('/riwayat', riwayat)

module.exports = routes