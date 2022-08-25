const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cellphone: {
            type: DataTypes.STRING,
        },
        profilePic: {
            type: DataTypes.STRING,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        creditCard: {
            type: DataTypes.BIGINT,
        },
    });
};