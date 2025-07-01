'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: 'boeing188', 
        capacity:120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "boeing430",
        capacity:200,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Airplanes', {
      [Op.or]:[
        {
          modelNumber:"boeing777"
        },
        {
          modelNumber: "airbus340"
        }, 
      ]
    });
  }
};
