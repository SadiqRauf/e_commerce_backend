const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderDetail = sequelize.define('OrderDetail', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unit_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'shipped', 'cancelled'), defaultValue: 'pending' }
}, {
    timestamps: true
});

OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
Order.hasMany(OrderDetail, { foreignKey: 'order_id' });

OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderDetail, { foreignKey: 'product_id' });

module.exports = OrderDetail;
