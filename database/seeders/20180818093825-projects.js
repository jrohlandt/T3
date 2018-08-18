'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('projects', [
        {name: 'Webinarignition', userId: 1, colorId: 5},
        {name: 'Provely', userId: 1, colorId: 1},
        {name: 'Heatmaptracker', userId: 1, colorId: 2},
        {name: 'PressPlay', userId: 1, colorId: 4},
        {name: 'Listeruption2', userId: 1, colorId: 9},
        {name: 'LeadGrab', userId: 1, colorId: 9},
        {name: 'Emailspike', userId: 1, colorId: 3},
        {name: 'Timerspike', userId: 1, colorId: 3},
        {name: 'SeoSnapshot', userId: 1, colorId: 2},
        {name: 'ProjectHub', userId: 1, colorId: 4},
        {name: 'PinPoint', userId: 1, colorId: 9},
        {name: 'TicketHub', userId: 1, colorId: 7},
        {name: 'Publishvault', userId: 1, colorId: 9},
        {name: 'ScarcityBuilder', userId: 1, colorId: 9},
        {name: 'Reverse Rank Checker', userId: 1, colorId: 9},
      ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('projects', null, {});
  }
};
