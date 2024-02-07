const { BRANCH } = require("../model/branch");

module.exports = {
    get: async (req, res) => {
        const object = {}
        if (!req.query | !(req.query?.name & req.query?.shopID)) { res.statusCode = 403; res.end("Need more values"); return false }
        if (req.query?.name) object.name = req.query?.name
        if (req.query?.shopID) object.shopID = req.query?.shopID
        res.json(await BRANCH.findAll({ "attributes": ['name', 'contacts', 'location', 'ID'], where: { ...object, isDeleted: false } }))
        // res.end("ok")
    },
    post: async (req, res) => {
        let { body } = req
        let branch = await BRANCH.create({ name: body.name, shopID: body.shopID, contacts: body?.contacts, location: body?.location })
        res.json(branch)
    },
    put: async (req, res) => {
        let { body } = req,
            object = {}
        if (!body | !body.ID) { res.statusCode = 403; res.end("Need more values"); return false }
        let branch = await BRANCH.findOne(body.ID)
        if (body?.name) object.name = body.name
        if (body?.location) object.location = body.location
        if (body?.contacts) object.contacts = body.contacts
        branch.update(object)
        res.json(branch)
        // res.end("ok")
    },
    delete: async (req, res) => {
        let { body } = req
        if (!body | !body.ID) { res.statusCode = 403; res.end("Need more values"); return false }
        let branch = await BRANCH.findByPk(body.ID).update('isDeleted', true)
        res.json(branch)
    }
}