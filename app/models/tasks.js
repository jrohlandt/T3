'use strict';
module.exports = (sequelize, DataTypes) => {
  var tasks = sequelize.define('tasks', {
    description: DataTypes.STRING,
    projectId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER
  }, {});
  tasks.associate = function(models) {
    // associations can be defined here
  };
  return tasks;
};