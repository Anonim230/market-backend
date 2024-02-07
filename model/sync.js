const { sequelize } = require("./default_settings");
const { BRANCH } = require("./branch");
const { CASHIER } = require("./cashier");
const { PRODUCT } = require("./product");
const { SHOP } = require("./shop");
const { USER } = require("./user");

(async function () {
    await USER.sync().then(() => {
        console.log('User table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table user: ', error);
    });
    await CASHIER.sync().then(() => {
        console.log('Cashier table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table cashier: ', error);
    });
    await PRODUCT.sync().then(() => {
        console.log('Product table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table product: ', error);
    });
    await BRANCH.sync().then(() => {
        console.log('Branch table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table branch: ', error);
    });
    await SHOP.sync().then(() => {
        console.log('Shop table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
})()