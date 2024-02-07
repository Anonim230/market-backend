const { DataTypes } = require("sequelize");
const { sequelize, ID } = require("./default_settings");

const PRODUCT = sequelize.define("product", {
    ID,
    name: { type: DataTypes.CHAR, allowNull: false },
    description: {
        type: DataTypes.CHAR(sequelize.two_bytes)
    },
    photo: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: "/public/anonim.jpg"
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // начальная цена
    startPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sold: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    // кол-во на складе
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    //состав
    structure: {
        type: DataTypes.CHAR(sequelize.two_bytes)
    },
    //единица измерения
    measure: {
        type: DataTypes.CHAR,
        allowNull: false,
        values: ['kg', 'g', 'l', 'ml', 'f']
    },
    // в одной пачке столько литров, граммов и т.д.
    measureInOnePacket: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Срок годности
    expiration: {
        type: DataTypes.TIME
    }, branchId: {
        type: DataTypes.UUID,
        references: {
            model: "branch",
            key: "ID"
        }
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { tableName: "product", timestamps: false });
// PRODUCT.sync().then(() => {
//     console.log('Product table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table product: ', error);
// });
module.exports = { PRODUCT }