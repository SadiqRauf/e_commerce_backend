const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');
// const Customer = require('./Customer');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 }
}, {
    timestamps: true
});

// Order.belongsTo(Customer, { foreignKey: 'customer_id' });
// Customer.hasMany(Order, { foreignKey: 'customer_id' });

module.exports = Order;
