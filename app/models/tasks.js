'use strict';
module.exports = (sequelize, DataTypes) => {
  var tasks = sequelize.define('tasks', {
    description: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    tzOffset: DataTypes.TINYINT,
    tzName: DataTypes.STRING

  }, {});
  tasks.associate = function(models) {
    // associations can be defined here
  };
  return tasks;
};