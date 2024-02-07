const jwt = require("jsonwebtoken");
require('dotenv').config()
const secret_word = process.env.SECRET_KEY

module.exports = {
    sign: payload => jwt.sign(JSON.stringify(payload + process.env.SALT), secret_word),
    verify: token => JSON.parse(jwt.verify(token, secret_word)) - process.env.SALT
}