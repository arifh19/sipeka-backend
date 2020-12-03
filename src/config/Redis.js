const redis = require('redis')

class Redis {
    constructor() {
        this.redisDB = redis.createClient({
            host    : process.env.REDIS_HOST || '127.0.0.1',
            port    : process.env.REDIS_PORT || '6379',
            password: process.env.REDIS_PASSWORD || '1sampai9',
        })
    }

    redisCheck() {
        return new Promise((resolve, reject) => {
            this.redisDB.get("testkey", (err, res) => {
                if (err) {
                    reject('Redis is not connected')
                } else if (res === null || res === "OK") {
                    resolve("Redis is connected")
                }
            })
        })
    }

}

module.exports = new Redis()