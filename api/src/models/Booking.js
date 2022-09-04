const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('booking', {
    idBooking: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    totalPrice: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'confirmed'
    },
  }, {
    timestamps: false
  });
};
