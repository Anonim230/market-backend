const { Sequelize, DataTypes } = require('sequelize');

const connection_string = "postgres://mhesvlvc:91TFeWcK4caUc3WZUh6gtLXgYfve6AfN@rain.db.elephantsql.com/mhesvlvc";

// const sequelize = new Sequelize("shop", "postgres", "1234", {
//     dialect: 'postgres',
//     host: "localhost",
//     logging: false
// })
const sequelize = new Sequelize(connection_string, { logging: false });
const ID = {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
}
const WORKER_OBJECT = {
    ID,
    name: { type: DataTypes.CHAR, allowNull: false },
    contacts: {
        type: DataTypes.ARRAY(DataTypes.CHAR(31)),
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isMale: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    passportRegDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    passportSerialNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.CHAR(256 * 256 - 1),
        allowNull: true
    },
    photo: {
        type: DataTypes.CHAR(1023),
        defaultValue: "/public/anonim.jpg"
    },
    hireDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fireDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    salary: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    }, branchId: {
        type: DataTypes.UUID,
        references: {
            model: "branch",
            key: "ID"
        }
    },
    isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}
sequelize.two_bytes = 256 * 256 - 1
module.exports = { sequelize, ID, WORKER_OBJECT }
// Не забудь в конце моделей дописать , { tableName: "product", timestamps: false } ибо вылетет ошибка
// в конце этой иерархии надо не забыть sequelize.authenticate()