const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('contact', {
        idContact: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        name: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        phone: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        summary: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        sentiment: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        language: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        translation: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
    }, {
        timestamps: false
    });
};
