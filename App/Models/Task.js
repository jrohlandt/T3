'use strict';
module.exports = (sequelize, DataTypes) => {
  var t = sequelize.define('tasks', {
    description: DataTypes.STRING,
    userId: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    tzOffset: DataTypes.TINYINT,
    tzName: DataTypes.STRING

  }, {});
  t.associate = function(models) {
    // associations can be defined here
  };
  return t;
};