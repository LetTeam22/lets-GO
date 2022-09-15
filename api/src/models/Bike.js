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
      allowNull: false,
    },
    wheelSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 7,
      get() {
        const rawValue = this.getDataValue('rating');
        return rawValue ? Math.round((rawValue + Number.EPSILON) * 10) / 10 : 0;
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'service', 'deleted'),
      defaultValue: 'active'
    },
    nunOfReviews: {
      type: DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    timestamps: false
  });
};
