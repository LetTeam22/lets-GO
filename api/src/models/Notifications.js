const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('notifications', {
        type: {
            type: DataTypes.ENUM('like', 'login', 'reservation'),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
};