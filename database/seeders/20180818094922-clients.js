'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('clients', [
        { name: 'Personal', userId: 1},
        { name: 'Magiweb', userId: 1},
        { name: 'DigitalKickstart', userId: 1},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('clients', null, {});
  }
};
