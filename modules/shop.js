const { SHOP } = require("../model/shop");

module.exports = {
    get: async (req, res) => {
        // console.log(req.body, req.body);
        if (!req.body?.name) { res.statusCode = 403; res.end("Need more values"); return false }
        const shop = await SHOP.findOne({ where: { username: req.body.name }, "attributes": ['name', 'description'] })
        res.json(shop)
        // res.end("ok")
    },
    post: async (req, res) => {
        let { body } = req
        if (!body | !body?.name) { res.statusCode = 403; res.end("Invalid request"); return false }
        const shop = SHOP.create(body, { "fields": ['name', 'description'] })
        await res.json(shop)
    },
    put: async (req, res) => {
        const { body } = req
        if (!body | !body?.name | !body?.description) { res.statusCode = 403; res.end("Need more values"); return false }
        const shop = await SHOP.findOne({ where: { name: body.name, token: sign(body?.description) } })
        if (body.name?.new) await shop.update('name', body.name?.new)
        if (body.description?.new) await shop.update('description', body.description?.new)
        res.json(shop)
    },
    delete: async (req, res) => {
        const { body } = req
        if (!body | !body?.name) { res.statusCode = 403; res.end("Need more values"); return false }
        const shop = await SHOP.findOne({ where: { name: body.name } })
        await shop.update("isDeleted", true)
        res.end('Done')
    }
}
// get: (req, res) => {
//     SHOP.findOne({ "attributes": ['name'], where: { name: req.query.ID, isDeleted: false } }).then(data => res.json(new Object(data)))
//     // res.end("ok")
// },
// post: async (req, res) => {
//     let { body } = req
//     let shop = await SHOP.create({ name: body.name })
//     res.json(shop)
// },