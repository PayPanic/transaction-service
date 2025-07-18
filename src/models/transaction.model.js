const { DataTypes } = require('sequelize');
const { createSequelizeInstance } = require('infra-lib/db/sequelize');

const sequelize = createSequelizeInstance({});

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('charge', 'refund'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('initiated', 'processed', 'failed'),
        allowNull: false,
        defaultValue: 'initiated',
    },
}, {
    tableName: 'transactions',
});

(async () => await sequelize.sync())();

module.exports = { Transaction };
