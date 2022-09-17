const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('advBookings', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        adventuresNames: {
            type: DataTypes.ENUM("Trasmontaña", "Escapada a Tafí del Valle", "Circuito de las yungas", "Luna tucumana"),
            allowNull: false
        }
    })
}