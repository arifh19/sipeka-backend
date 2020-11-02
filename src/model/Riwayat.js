const database = require('../config/Databases')
const Riwayat = {}

Riwayat.getAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT  * FROM riwayat ORDER BY id DESC LIMIT 20', function (error, rows, fields){
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
        database.query(`INSERT INTO riwayat (data) VALUES (${data})`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(Riwayat.getAll())
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