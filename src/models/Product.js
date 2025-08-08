const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
    color: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    paranoid: true,
    timestamps: true
});

Product.belongsTo(Category, { foreignKey: 'category_id' });  // Establishing a foreign key relationship 
Category.hasMany(Product, { foreignKey: 'category_id' });   // Establishing a one-to-many relationship

module.exports = Product;
