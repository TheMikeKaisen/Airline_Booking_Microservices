'use strict';
const {
  Model
} = require('sequelize');
const { Enums } = require('../utils/common');
const {BOOKED, CANCELLED, INITIATED, PENDING} = Enums.BOOKIGN_STATUS
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    flightId: {
      types: DataTypes.INTEGER,
      allowNull: false,

    },
    userId: {
      types: DataTypes.INTEGER,
      allowNull: false,

    },
    status: {
      types: DataTypes.ENUM,
      allowNull: false,
      values: [BOOKIGN_STATUS, CANCELLED, INITIATED, PENDING],
      defaultValue: INITIATED,

    },
    noOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    totalCost: {
      types: DataTypes.INTEGER,
      allowNull: false,

    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};