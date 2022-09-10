const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        cellphone: {
            type: DataTypes.STRING,
        },
        profilePic: {
            type: DataTypes.STRING,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        creditCard: {
            type: DataTypes.BIGINT,
        },
        status: {
            type: DataTypes.ENUM('active', 'banned', 'deleted'),
            allowNull: false,
            defaultValue: 'active'
        }
    }, {
        timestamps: false
    });
};