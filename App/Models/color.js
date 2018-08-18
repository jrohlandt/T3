'use strict';
module.exports = (sequelize, DataTypes) => {
  var color = sequelize.define('color', {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {});
  color.associate = function(models) {
    // associations can be defined here
  };
  return color;
};