const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('adventuresbooked', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('confirmed', 'cancelled'),
            allowNull: false,
            defaultValue: 'confirmed'
        }
    }, {
        timestamps: false
    })
}