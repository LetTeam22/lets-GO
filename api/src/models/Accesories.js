const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('accesories', {
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
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('active', 'deleted'),
          defaultValue: 'active'
        }
    }, {
        timestamps: false
    });
};