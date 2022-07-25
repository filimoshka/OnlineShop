const {Flacon} = require('../models/models')

class FlaconController {
    async create(req, res) {
        const {name} = req.body
        const flacon = await Flacon.create({name})
        return res.json(flacon)
    }

    async getAll(req, res) {
        const flacons = await Flacon.findAll()
        return res.json(flacons)
    }

}

module.exports = new FlaconController()
