'use strict';
module.exports = (sequelize, DataTypes) => {
  var client = sequelize.define('client', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  client.associate = function(models) {
    // associations can be defined here
  };
  return client;
};