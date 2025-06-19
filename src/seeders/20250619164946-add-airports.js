'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airports", [
      {
        name: "Indira Gandhi International Airport",
        code: "DEL",
        address: "New Delhi",
        cityId: 10, // Delhi
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Chhatrapati Shivaji Maharaj International Airport",
        code: "BOM",
        address: "Mumbai",
        cityId: 24, // Mumbai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Kempegowda International Airport",
        code: "BLR",
        address: "Bengaluru",
        cityId: 25, // Bangalore
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rajiv Gandhi International Airport",
        code: "HYD",
        address: "Shamshabad",
        cityId: 26, // Hyderabad
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Chennai International Airport",
        code: "MAA",
        address: "Meenambakkam",
        cityId: 27, // Chennai
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Netaji Subhas Chandra Bose International Airport",
        code: "CCU",
        address: "Dum Dum",
        cityId: 28, // Kolkata
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Pune Airport",
        code: "PNQ",
        address: null,
        cityId: 29, // Pune
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sardar Vallabhbhai Patel International Airport",
        code: "AMD",
        address: "Ahmedabad",
        cityId: 30, // Ahmedabad
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Jaipur International Airport",
        code: "JAI",
        address: null,
        cityId: 22, // Jaipur
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lal Bahadur Shastri International Airport",
        code: "VNS",
        address: "Varanasi",
        cityId: 23, // Varanasi
        createdAt: new Date(),
        updatedAt: new Date()
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
  }
};
