const { DataTypes, STRING } = require('sequelize')

module.exports = (sequelize) => {

    sequelize.define('adventures', {
        idAdv: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        },
        conditions: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        publicImg: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.ENUM('baja', 'media', 'alta'),
        },
        date: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM('active', 'deleted'),
            defaultValue: 'active'
        }
    }, {
        timestamps: false
    }
    )
}