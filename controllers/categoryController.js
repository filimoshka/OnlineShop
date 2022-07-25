const ApiError = require("../error/ApiError");
const {Category} = require('../models/models')
class CategoryController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const category = await Category.create({name})
            return res.json(category)
        } catch (e) {
            next(ApiError.forbidden(e.message))
        }
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

}

module.exports = new CategoryController()




