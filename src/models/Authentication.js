const { DataTypes } = require('sequelize');
const sequelize = require('../database-connection/db');

// Define User model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    country: DataTypes.STRING
}, {
    tableName: 'users',
    timestamps: true
});

// Define Authentication model
const Authentication = sequelize.define('Authentication', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'authentications',
    timestamps: true
});

// Define the association
Authentication.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Authentication, { foreignKey: 'user_id' });

module.exports = {
    User,
    Authentication
};
