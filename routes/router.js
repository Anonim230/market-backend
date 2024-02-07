const { Router } = require("express");
const { verify } = require('../lib/jwt');
const shop = require("../modules/shop");
const user = require("../modules/user");
const path = require('path');
const branch = require("../modules/branch");
const cashier = require("../modules/cashier");
const product = require("../modules/product");
require('../model/user')
require('../model/sync');
const router = Router()

const imports = { shop, branch, cashier, product }

router.get('/api/user', user.get)
router.post('/api/user', user.post)
router.put('/api/user', user.put)
router.delete('/api/user', user.delete)
router.get('/public/anonim.jpg', (req, res) => res.sendFile(path.join(__dirname, "..", "public", "anonim.jpg")))

router.use((req, res, next) => {
    try {
        if (!req?.cookies | !req.cookies?.username | !verify(req.cookies?.token)) { res.statusCode = 401; res.end("You aren't logged in"); return false }
    } catch (e) {
        res.statusCode = 401; res.end("You aren't logged in"); return false
    }
    // console.log(USER.findOne({
    //     "attributes": ['username', 'token'], where: { username: req.cookies.username, token: req.cookies.token }
    // }));
    user.findOne({
        "attributes": ['username'], where: { username: req.cookies.username, token: req.cookies.token }
    }).then(v => v.username ? next() : res.statusCode = 401 | res.end("Invalid token"))
})

for (let route of Object.keys(imports)) {
    for (let method of Object.keys(imports[route]))
        if (method === 'get') router.get(`/api/${route}`, imports[route][method])
        else if (method === 'post') router.post(`/api/${route}`, imports[route][method])
        else if (method === 'delete') router.delete(`/api/${route}`, imports[route][method])
        else if (method === 'put') router.delete(`/api/${route}`, imports[route][method])
}
module.exports = router