const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    paranoid: true, // soft delete
    timestamps: true
});

module.exports = Category;
