'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('colors', [
      {name: 'green', value: '171, 47%, 52%'},
      {name: 'red', value: '359, 100%, 62%'},
      {name: 'yellow', value: '40, 92%, 58%'},
      {name: 'blue', value: '201, 97%, 36%'},
      {name: 'orange', value: '13, 97%, 55%'},
      {name: 'pink', value: '351, 76%, 68%'},
      {name: 'purple', value: '307, 21%, 48%'},
      {name: 'turquoise', value: '187, 52%, 65%'},
      {name: 'grey', value: '240, 6%, 67%'},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('colors', null, {});    
  }
};
