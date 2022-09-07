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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    timestamps: false
  });
};