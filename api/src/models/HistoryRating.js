const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('historyrating', {
        idHistoryRating: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idBikeRated: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        scoreReceived: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        timestamps: false
    });
};