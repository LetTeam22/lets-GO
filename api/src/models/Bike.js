const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('bike', {
    idBike: {
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    traction: {
      type: DataTypes.STRING,
    },
    wheelSize: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    color: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('active', 'service', 'deleted'),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    timestamps: false
  });
};
