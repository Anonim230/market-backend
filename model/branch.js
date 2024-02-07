const { DataTypes } = require("sequelize");
const { sequelize, ID } = require("./default_settings");
const { CASHIER } = require("./cashier");
const { PRODUCT } = require("./product");
const { USER } = require("./user");

const BRANCH = sequelize.define("branch", {
    ID,
    name: { type: DataTypes.CHAR, allowNull: false },
    location: {
        type: DataTypes.CHAR(sequelize.two_bytes),
        allowNull: true
    },
    contacts: {
        type: DataTypes.ARRAY(DataTypes.CHAR(31))
    },
    shopId: {
        type: DataTypes.UUID,
        references: {
            model: "shop",
            key: 'ID'
        }
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: "branch", timestamps: false });
BRANCH.hasMany(CASHIER);
BRANCH.hasMany(PRODUCT);
BRANCH.hasOne(USER, { "foreignKey": "organizationID" })
// BRANCH.sync().then(() => {
//     console.log('Branch table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table branch: ', error);
// });
module.exports = { BRANCH }