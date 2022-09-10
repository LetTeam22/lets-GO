const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('experience', {
    idExperience: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imgExperience: {
      type: DataTypes.STRING,
      defaultValue: 'sample'
    },
    textExperience: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted'),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    timestamps: false
  });
};