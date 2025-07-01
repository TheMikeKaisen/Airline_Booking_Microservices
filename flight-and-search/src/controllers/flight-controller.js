const { StatusCodes } = require("http-status-codes");
const { AirportService, CityService, FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function createFlight(req, res) {
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.message = "Successfully created an airport";
        SuccessResponse.data = flights
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log("error in controller", error)
        ErrorResponse.error = error
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}

async function getAllFlights(req, res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log("error in controller", error)
        ErrorResponse.error = error
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}
async function getFlight(req, res){
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log("error in controller", error)
        ErrorResponse.error = error
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}


// async function updateAirport(req, res) {
//     try {
//         const updateAirportData = new Object();

//         // if the airport is present, then take its original value of modelNumber and capacity
//         const airportData = await AirportService.getAirport(req.params.id);
//         updateAirportData.name = airportData.name
//         updateAirportData.code = airportData.code
//         updateAirportData.cityId = airportData.cityId
//         updateAirportData.address = airportData.address

//         if (req.body.name !== undefined) {
//             updateAirportData.name = req.body.name;
//         }
//         if (req.body.code !== undefined) {
//             updateAirportData.code = req.body.code;
//         }
//         if (req.body.cityId !== undefined) {
//             const cityId = req.body.cityId;
//             const cityBody = await CityService.getCity(cityId);
//             // if the new cityId is invalid, then throw error
//             if (cityBody === undefined) {
//                 throw new AppError("No city available with the given city Id.", StatusCodes.BAD_REQUEST);
//             }
//             updateAirportData.cityId = req.body.cityId;
//         }
//         if(req.body.address !== undefined) {
//             updateAirportData.address = req.body.address
//         }

//         const airport = await AirportService.updateAirport(req.params.id, updateAirportData);
//         SuccessResponse.data = airport;
//         return res.status(StatusCodes.OK).json(SuccessResponse);
//     } catch (error) {
//         ErrorResponse.error = error;
//         return res.status(error.statusCode || 500).json(ErrorResponse);
//     }
// }


module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}