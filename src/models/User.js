const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zip_code: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING }
}, {
    tableName: 'users',
    timestamps: true
});

module.exports = User;
