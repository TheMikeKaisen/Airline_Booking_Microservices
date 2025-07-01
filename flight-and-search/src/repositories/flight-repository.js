const { Sequelize } = require('sequelize');
const { Flight, Airplane, Airport, City } = require('../models');
const CrudRepository = require('./crud-repository')

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            // to apply joins, sequelize provides a property called include
            include: [
                {
                model: Airplane,
                required: true, // required: false -> OUTER JOIN; required: true -> INNER JOIN
                as: "airplaneDetails" // returns the response object with alias
                },

                // departure airport details
                {
                    model: Airport,
                    requied: true,
                    as: "departureAirport", 
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                    }

                },

                // arrival airport details
                {
                    model: Airport,
                    required: true,
                    as: "arrivalAirport",
                    on:{
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                }
            ]
        });
        return response;
    }
}

module.exports = FlightRepository;