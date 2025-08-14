const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    status: { type: DataTypes.ENUM('pending', 'completed', 'cancelled'), defaultValue: 'pending' },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    quantity: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },

    // Store selected products as JSON
    selected_products: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
        // Example: [{ product_id: 'uuid', name: 'Product A', price: 50, qty: 2 }]
    }
}, {
    timestamps: true
});

Order.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Order, { foreignKey: 'user_id' });


module.exports = Order;
