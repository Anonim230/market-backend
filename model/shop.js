const { DataTypes } = require("sequelize");
const { sequelize, ID } = require("./default_settings");

const SHOP = sequelize.define("shop", {
    ID,
    name: { type: DataTypes.CHAR, allowNull: false },
    description: { type: DataTypes.CHAR(sequelize.twobytes), allowNull: true },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: "shop", timestamps: false, freezeTableName: true });
// SHOP.hasMany(BRANCH, { foreignKey: "shopId" })
// SHOP.sync().then(() => {
//     console.log('Shop table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });
module.exports = { SHOP }