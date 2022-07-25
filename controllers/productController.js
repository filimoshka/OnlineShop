const uuid = require('uuid')
const path = require('path');
const {Product} = require('../models/models')
const ApiError = require('../error/ApiError');
const fs = require("fs");
const {json} = require("sequelize");

class ProductController {

    async create(req, res, next) {
        try {
            let {name, description, composition, price, flaconId, categoryId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({name, description, composition, price, flaconId, categoryId, img: fileName});

            return res.json(product)
        } catch (e) {
            next(ApiError.forbidden(e.message))
        }

    }

    async getAll(req, res) {
        let {flaconId, categoryId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (!flaconId && !categoryId) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (flaconId && !categoryId) {
            products = await Product.findAndCountAll({where:{flaconId}, limit, offset})
        }
        if (!flaconId && categoryId) {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }
        if (flaconId && categoryId) {
            products = await Product.findAndCountAll({where:{categoryId, flaconId}, limit, offset})
        }
        fs.writeFileSync('data.txt', JSON.stringify(products));
        return res.json(products)

    }

    async getOne(req, res) {
        const {id} = req.params

        const product = await Product.findOne(
            {
                where: {id}
            },
        )
        return res.json(product)
    }

    async update(req, res) {
        const {id} = req.params
        let {name, description, composition, price, flaconId, categoryId} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const product = await Product.update(
            {
                name: name,
                description: description,
                composition: composition,
                price: price,
                flaconId: flaconId,
                categoryId: categoryId,
                img: fileName
            },
            {
                where: {id: id}
            }
            );

        return res.json(product)

    }
    async delete(req, res) {
        const {id} = req.params
        const product = await Product.destroy(
            {
                where: {
                    id: id
                }
            });
        return res.json(product)

    }

}

module.exports = new ProductController()
