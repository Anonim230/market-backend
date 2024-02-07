const { Op } = require("sequelize");
const { PRODUCT } = require("../model/product");

const measure_values = ['kg', 'g', 'l', 'ml', 'f'];
module.exports = {
    get: async (req, res) => {
        const object = {},
            { query } = req
        if (!query | !Object.keys(query).length) { res.statusCode = 403; res.end("Need more values"); return false }
        if (query?.ID) return res.json(await PRODUCT.findByPk(query.ID))
        if (query?.name) object.name = { [Op.like]: `%${query.name}%` }
        if (query?.photo) object.photo = query?.photo
        if (query?.BranchID) object.BranchID = query?.BranchID
        if (query?.measure | measure_values.indexOf(query.measure) !== -1) object.measure = query?.measure
        if (query?.structure) object.structure = { [Op.like]: `%${query.structure}%` }
        if (query?.description) object.description = { [Op.like]: `%${query.description}%` }
        if (query?.startPrice) object.startPrice = query?.startPrice
        if (query?.price) object.price =
            query.price.from && query.price.to ?
                { [Op.between]: [query.price.from, query.price.to] }
                : query.price
        if (query?.sold) object.sold =
            query.sold.from && query.sold.to ?
                { [Op.between]: [query.sold.from, query.sold.to] }
                : query.sold
        if (query?.amount) object.amount =
            query.amount.from && query.amount.to ?
                { [Op.between]: [query.amount.from, query.amount.to] }
                : query.amount
        if (query?.measuresInOnePacket) object.measuresInOnePacket =
            query.measuresInOnePacket.from && query.measuresInOnePacket.to ?
                { [Op.between]: [query.measuresInOnePacket.from, query.measuresInOnePacket.to] }
                : query.measuresInOnePacket
        if (query?.expiration) object.expiration =
            query.expiration.from && query.expiration.to ?
                { [Op.between]: [query.expiration.from, query.expiration.to] }
                : query.expiration
        res.json(await PRODUCT.findAll(object))
        // res.end("ok")
    },
    post: async (req, res) => {
        const object = {},
            { body } = req
        if (!body | !Object.keys(body).length) { res.statusCode = 403; res.end("Need more values"); return false }
        if (!query.BranchID) { res.statusCode = 403; return res.end('Enter Branch ID') }
        object.BranchID = query.BranchID
        if (query?.name) object.name = query.name
        if (query?.photo) object.photo = query.photo
        if (query?.measure | measure_values.indexOf(query.measure) !== -1) object.measure = query.measure
        if (query?.structure) object.structure = query.structure
        if (query?.price) object.price = query.price
        if (query?.startPrice) object.startPrice = query.startPrice
        if (query?.structure) object.structure = query.structure
        if (query?.description) object.description = query.description
        if (query?.startPrice) object.startPrice = query.startPrice
        let PRODUCT = await PRODUCT.create(object)
        res.json(PRODUCT)
    },
    put: async (req, res) => {
        const object = {},
            { body } = req
        if (!body | !Object.keys(body).length | !body.ID) { res.statusCode = 403; res.end("Need more values"); return false }
        if (!query.BranchID) { res.statusCode = 403; return res.end('Enter Branch ID') }
        object.BranchID = query.BranchID
        if (query?.name) object.name = query.name
        if (query?.photo) object.photo = query.photo
        if (query?.measure | measure_values.indexOf(query.measure) !== -1) object.measure = query.measure
        if (query?.structure) object.structure = query.structure
        if (query?.price) object.price = query.price
        if (query?.startPrice) object.startPrice = query.startPrice
        if (query?.structure) object.structure = query.structure
        if (query?.description) object.description = query.description
        if (query?.startPrice) object.startPrice = query.startPrice
        res.json(await PRODUCT.update(object))
    },
    delete: async (req, res) => {
        let { body } = req
        if (!body | !body.ID) { res.statusCode = 403; res.end("Need more values"); return false }
        let product = await PRODUCT.findByPk(body.ID).update('isDeleted', true)
        res.json(product)
    }
}