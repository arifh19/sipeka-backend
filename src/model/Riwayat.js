const database = require('../config/Databases')
const Riwayat = {}

Riwayat.getAll = (node) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT  * FROM ${node} ORDER BY id DESC LIMIT 20`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(rows)
            }
        })
    })
}

Riwayat.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO ${data.table} (data, node_id, created_at, updated_at) VALUES (${data.data}, ${data.node_id}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(Riwayat.getAll(data.table))
            }
        })
    })
}

Riwayat.edit = (id, data) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE riwayat SET data='${data}' WHERE id=${id}`, (error, rows, fields) => {
            if(error){
                reject(error)
            } else{
                resolve(Riwayat.getAll())
            }
        })
    })
}

Riwayat.delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM riwayat WHERE id=${id}`, (error, rows, fields) => {
            if(error){
                reject(error)
            } else{
                resolve(Riwayat.getAll())
            }
        })
    })
}

module.exports = Riwayat