'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Flights',
      [
        {
          flightNumber: "AI 401",
          airplaneId: 15,
          departureAirportId: "DEL",
          arrivalAirportId: "BOM",
          arrivalTime: new Date("2025-10-01T09:10:00"),
          departureTime: new Date("2025-10-01T06:40:00"),
          boardingGate: "A5",
          price: 5600,
          totalSeats: 180,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          flightNumber: "6E 104",
          airplaneId: 22,
          departureAirportId: "DEL",
          arrivalAirportId: "BOM",
          arrivalTime: new Date("2025-10-02T21:30:00"),
          departureTime: new Date("2025-10-02T18:45:00"),
          boardingGate: null,
          price: 5100,
          totalSeats: 180,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          flightNumber: "G8 511",
          airplaneId: 26,
          departureAirportId: "BLR",
          arrivalAirportId: "JAI",
          arrivalTime: new Date("2025-10-03T17:20:00"),
          departureTime: new Date("2025-10-03T14:30:00"),
          boardingGate: "B3",
          price: 4700,
          totalSeats: 120,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          flightNumber: "UK 212",
          airplaneId: 24,
          departureAirportId: "BLR",
          arrivalAirportId: "JAI",
          arrivalTime: new Date("2025-10-04T13:00:00"),
          departureTime: new Date("2025-10-04T10:15:00"),
          boardingGate: "C1",
          price: 4900,
          totalSeats: 120,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          flightNumber: "AI 703",
          airplaneId: 21,
          departureAirportId: "MAA",
          arrivalAirportId: "DEL",
          arrivalTime: new Date("2025-10-05T12:20:00"),
          departureTime: new Date("2025-10-05T09:30:00"),
          boardingGate: null,
          price: 5000,
          totalSeats: 150,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          flightNumber: "SG 404",
          airplaneId: 19,
          departureAirportId: "DEL",
          arrivalAirportId: "JAI",
          arrivalTime: new Date("2025-10-06T15:10:00"),
          departureTime: new Date("2025-10-06T13:00:00"),
          boardingGate: null,
          price: 3600,
          totalSeats: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          flightNumber: "6E 905",
          airplaneId: 28,
          departureAirportId: "DEL",
          arrivalAirportId: "JAI",
          arrivalTime: new Date("2025-10-07T20:00:00"),
          departureTime: new Date("2025-10-07T17:10:00"),
          boardingGate: "D6",
          price: 3700,
          totalSeats: 100,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
      


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
