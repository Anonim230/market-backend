const { USER } = require("../model/user");
const { sign } = require("../lib/jwt");
// USER.findAll().then(v => console.log(v))

// USER.findAll().then(a => a[0].update({ isAdmin: true, where: { username: "Tester" } }))
module.exports = {
    get: async (req, res) => {
        // console.log(req.body, req.body);
        if (!req.body?.username | !req.body?.password) { res.statusCode = 403; res.end("Need more values"); return false }
        const user = await USER.findOne({ where: { username: req.body.username, token: sign(req.body.password) }, "attributes": ['email', 'token', 'username', 'isAdmin'] })
        res.cookie("username", user.username, { expires: new Date(new Date.now() + 30 * 24 * 60 * 60 * 1000) })
        res.cookie("token", user.token, { expires: new Date(new Date.now() + 30 * 24 * 60 * 60 * 1000) })
        res.json(user)
        // res.end("ok")
    },
    post: async (req, res) => {
        let { body } = req
        if (!body | !body?.password | !body?.username) { res.statusCode = 403; res.end("Invalid request"); return false }
        req.body.token = sign(body.password)
        if (body.inviter?.username && body.inviter?.token) {
            return await USER.findOne({ where: { username: body.inviter.username, token: body.inviter.token, isDeleted: false }, attributes: "isAdmin" })
                .then(data => res.json(USER.create({ ...body, isAdmin: data.isAdmin }, { "fields": ['username', 'token', 'email', 'isAdmin'] })))
        }
        else {
            const user = USER.create(body, { "fields": ['username', 'token', 'email'] })
            res.cookie("username", user.username, { expires: new Date(new Date.now() + 30 * 24 * 60 * 60 * 1000) })
            res.cookie("token", user.token, { expires: new Date(new Date.now() + 30 * 24 * 60 * 60 * 1000) })
            await res.json(user)
        }
    },
    put: async (req, res) => {
        const { body } = req,
            object = {}
        if (!body | !body?.username | !body?.password) { res.statusCode = 403; res.end("Need more values"); return false }
        const user = await USER.findOne({ where: { username: body.username, token: sign(body?.password) } })
        if (body.username?.new) object.username = body.username.new
        if (body.password?.new) object.token = sign(body.password.new)
        if (body.email?.new) object.email = body.email.new
        user.update(object)
        // res.json(user.where({'username', 'email'))
    },
    delete: async (req, res) => {
        const { body } = req
        if (!body | !body?.username | !body?.password) { res.statusCode = 403; res.end("Need more values"); return false }
        const user = await USER.findOne({ where: { username: body.username, token: sign(body?.password) } })
        await user.update("isDeleted", true)
        res.end('Done')
    }
}