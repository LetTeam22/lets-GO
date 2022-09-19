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
    },
    endDate: {
      type: DataTypes.DATEONLY,
    },
    totalPrice: {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled'),
      allowNull: false,
      defaultValue: 'confirmed'
    },
  }, {
    timestamps: false
  });
};
