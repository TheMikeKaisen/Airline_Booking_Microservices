'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports", {
      type: "FOREIGN KEY", // should be capital
      fields: ["cityId"],
      name: 'custom_fkey_constraint',
      references: {
        table: "Cities",
        field: "id"
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Airports", "custom_fkey_constraint");
  }
};
