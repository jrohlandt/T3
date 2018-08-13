'use strict';
module.exports = (sequelize, DataTypes) => {
  var Project = sequelize.define('project', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};