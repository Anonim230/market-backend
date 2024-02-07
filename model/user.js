const { DataTypes } = require("sequelize");
const { sequelize, ID } = require("./default_settings");

const USER = sequelize.define("user", {
    ID,
    username: { type: DataTypes.CHAR, allowNull: false },
    email: { type: DataTypes.CHAR },
    token: { type: DataTypes.CHAR(sequelize.twobytes), allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    isWorker: { type: DataTypes.BOOLEAN, defaultValue: false },
    workerID: { type: DataTypes.UUID, allowNull: true, references: { key: "ID", model: "cashier" } },
    organizationID: { type: DataTypes.UUID, allowNull: true, references: { key: "ID", model: "branch" } },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: "user", timestamps: false });

// USER.sync().then(() => {
//     console.log('User table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table user: ', error);
// });
module.exports = { USER }