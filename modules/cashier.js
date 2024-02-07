const { Op } = require("sequelize");
const { CASHIER } = require("../model/cashier");

module.exports = {
    get: async (req, res) => {
        const object = {},
            { query } = req
        if (!query | !Object.keys(query).length) { res.statusCode = 403; res.end("Need more values"); return false }
        if (query?.ID) return res.json(await CASHIER.findByPk(query.ID))
        if (query?.contacts) object.contacts = query?.contacts
        if (query?.isMale) object.isMale = query?.isMale
        if (query?.name) object.name = { [Op.like]: `%${query.name}%` }
        if (query?.photo) object.photo = query?.photo
        if (query?.BranchID) object.BranchID = query?.BranchID
        if (query?.passportRegDate) object.passportRegDate = query?.passportRegDate
        if (query?.passportSerialNumber) object.passportSerialNumber = query?.passportSerialNumber
        if (query?.address) object.address = { [Op.like]: `%${query.address}%` }
        if (query?.birthday) object.birthday =
            query.birthday.from && query.birthday.to ?
                { [Op.between]: [query.birthday.from, query.birthday.to] }
                : query.birthday
        if (query?.hireDate) object.hireDate =
            query.hireDate.from && query.hireDate.to ?
                { [Op.between]: [query.hireDate.from, query.hireDate.to] }
                : query.hireDate
        if (query?.fireDate) object.fireDate =
            query.fireDate.from && query.fireDate.to ?
                { [Op.between]: [query.fireDate.from, query.fireDate.to] }
                : query.fireDate
        if (query?.salary) object.salary =
            query.salary.from && query.salary.to ?
                { [Op.between]: [query.salary.from, query.salary.to] }
                : query.salary
        res.json(await CASHIER.findAll(object))
        // res.end("ok")
    },
    post: async (req, res) => {
        const object = {},
            { body } = req
        if (!body | !Object.keys(body).length) { res.statusCode = 403; res.end("Need more values"); return false }
        if (body?.contacts) object.contacts = body.contacts
        if (body?.isMale) object.isMale = body.isMale
        if (body?.name) object.name = body.name
        if (body?.photo) object.photo = body.photo
        if (body?.BranchID) object.BranchID = body.BranchID
        if (body?.passportRegDate) object.passportRegDate = body.passportRegDate
        if (body?.passportSerialNumber) object.passportSerialNumber = body.passportSerialNumber
        if (body?.hireDate) object.hireDate = body.hireDate
        if (body?.address) object.address = body.address
        if (body?.birthday) object.birthday = body.birthday
        if (body?.salary) object.salary = body.salary
        let cashier = await CASHIER.create(object)
        res.json(cashier)
    },
    put: async (req, res) => {
        const object = {},
            { body } = req
        if (!body | !Object.keys(body).length | !body.ID) { res.statusCode = 403; res.end("Need more values"); return false }
        object.hireDate = new Date().getDate()
        if (body?.contacts) object.contacts = body.contacts
        if (body?.isMale) object.isMale = body.isMale
        if (body?.name) object.name = body.name
        if (body?.photo) object.photo = body.photo
        if (body?.BranchID) object.BranchID = body.BranchID
        if (body?.passportRegDate) object.passportRegDate = body.passportRegDate
        if (body?.passportSerialNumber) object.passportSerialNumber = body.passportSerialNumber
        if (body?.address) object.address = body.address
        if (body?.birthday) object.birthday = body.birthday
        if (body?.salary) object.salary = body.salary
        let cashier = await CASHIER.findByPk(body.ID)
        await cashier.update(object)
        res.json(cashier)
    },
    delete: async (req, res) => {
        let { body } = req
        if (!body | !body.ID) { res.statusCode = 403; res.end("Need more values"); return false }
        let cashier = await CASHIER.findByPk(body.ID).update('isDeleted', true)
        res.json(cashier)
    }
}