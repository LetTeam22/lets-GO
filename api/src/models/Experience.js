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
      allowNull: false,
      defaultValue: 'https://res.cloudinary.com/pflet/image/upload/v1661970867/Let/Experiences/bike.jpg'
    },
    textExperience: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted'),
      allowNull: false,
      defaultValue: 'active'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sentiment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    translation: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    timestamps: false
  });
};