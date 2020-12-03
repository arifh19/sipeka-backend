const database = require('../config/Databases')
const Node = {}

Node.getAll = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT  * FROM node ORDER BY id DESC', function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(rows)
            }
        })
    })
}

Node.get = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM node WHERE nama='${data.nama}'`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(rows)
            }
        })
    })
}

Node.getById = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM node WHERE id='${id}'`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(rows)
            }
        })
    })
}

Node.getByTopic = (topic) => {
    return new Promise((resolve, reject) => {
        database.query(`SELECT * FROM node WHERE topic='${topic}'`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                resolve(rows)
            }
        })
    })
}

Node.add = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO node (nama, topic, created_at, updated_at) VALUES ('${data.nama}', '${data.topic}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                let table = data.nama.replace(/\s+/, "")
                database.query(`CREATE TABLE ${table} (id int NOT NULL AUTO_INCREMENT, data int NOT NULL, node_id int NOT NULL, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL, PRIMARY KEY (id), FOREIGN KEY (node_id) REFERENCES node(id));`, function (error, rows, fields){
                    if(error){
                        reject(error)
                    } else{
                        resolve(Node.getAll())
                    }
                })
            }
        })
    })
}

Node.edit = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE node SET nama='${data.nama}', topic='${data.topic}' WHERE id=${data.id}`, (error, rows, fields) => {
            if(error){
                reject(error)
            } else{
                let new_table = data.nama.replace(/\s+/, "")
                database.query(`ALTER TABLE ${data.old_table} RENAME ${new_table};`, function (error, rows, fields){
                    if(error){
                        reject(error)
                    } else{
                        resolve(Node.getAll())
                    }
                })
            }
        })
    })
}

Node.delete = (data) => {
    return new Promise((resolve, reject) => {
        database.query(`DROP TABLE ${data.table};`, function (error, rows, fields){
            if(error){
                reject(error)
            } else{
                database.query(`DELETE FROM node WHERE id=${data.id}`, (error, rows, fields) => {
                    if(error){
                        reject(error)
                    } else{
                        resolve(Node.getAll())
                    }
                })
            }
        })
        
    })
}

module.exports = Node