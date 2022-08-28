const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('bike', {
        idAcc: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL,
        }
    }, {
        timestamps: false
    });
};