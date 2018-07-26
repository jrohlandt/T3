'use strict';
module.exports = (sequelize, DataTypes) => {
  var u = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  }, {});
  u.associate = function(models) {
    // associations can be defined here
  };
  return u;
};