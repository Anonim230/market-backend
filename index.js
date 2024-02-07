const express = require('express');
const { sequelize } = require('./model/default_settings');
const router = require('./routes/router');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(router)
const PORT = process.env.PORT | 3000;
(async () => await sequelize.authenticate())().then(() => console.log("Successfully authentificated"));

app.listen(PORT, console.log(`We are working on ${PORT} port`))

// В файле .env надо SALT, SECRET_KEY и опционально PORT
module.exports = { app }