const { sequelize, WORKER_OBJECT } = require("./default_settings");
const { USER } = require("./user");


const CASHIER = sequelize.define("cashier", { ...WORKER_OBJECT }, { tableName: "cashier", timestamps: false });
CASHIER.hasOne(USER, { "foreignKey": "workerID" })
// CASHIER.sync().then(() => {
//     console.log('Cashier table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table cashier: ', error);
// });
module.exports = { CASHIER }