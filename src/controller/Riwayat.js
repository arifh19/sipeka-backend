const model = require('../model/Riwayat')
const Riwayat = {}

Riwayat.all = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        const data = await model.getAll()
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Riwayat.add = async (req, res) => {
    try {
        const {
            name
        } = req.body
        console.log(name)
        const data = await model.add(name)
        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Riwayat.edit = async (req, res) => {
    try {
        const {
            id,
            name
        } = req.body
        const data = await model.edit(id, name)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}

Riwayat.delete = async (req, res) => {
    try {
        const {
            id
        } = req.body
        const data = await model.delete(id)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json(error)
    }
}
module.exports = Riwayat