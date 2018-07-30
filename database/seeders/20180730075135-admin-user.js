'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@example.com',
        password: bcrypt.hashSync('password', 10),
        isAdmin: 1,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
