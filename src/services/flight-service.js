
const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories')

const flightRepository = new FlightRepository();
const AppError = require('../utils/errors/app-error');
const { CompareDateTimeHelper } = require('../utils/helpers');
const { Op } = require('sequelize');

async function createFlight(data) {

    try {
        const arrivalTime = data.arrivalTime;
        const departureTime = data.departureTime;

        if(!CompareDateTimeHelper.compareTime(arrivalTime, departureTime)){
            throw new AppError("Arrival Time cannot occur before departure Time.", StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log("error in service", error)
        if(error.name == 'SequelizeValidationError'){

            let explanations = [];
            error.errors.forEach((err)=>{
                explanations.push(err.message);
            })
            console.log(explanations)
            throw new AppError(explanations, StatusCodes.BAD_REQUEST)
            
        }
        throw new AppError(error.message || 'Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR)
    }

}


async function getAllFlights(query){

    let customFilter = {};

    // trips=MUM-DEL
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

    }
    // price=3500-5500
    if(query.price){
        let [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice===undefined) ? 20000 : maxPrice],
        }
    }

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers,
        }
    }
    
    if(query.tripDate){

        customFilter.departureTime = {
            [Op.gte]: query.tripDate
        }
    }

    // sort=departureTime_ASC,price_ASC
    let sortFilter = []
    if(query.sort){
        const params = query.sort.split(",")
        const sortFilters = params.map((param) => param.split("_"));
        sortFilter = sortFilters
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError("Cannot fetch data of flights.", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


// async function updateFlight(id, data) {
//     try {
//         const airport = await airportRepository.update(id, data);
//         return airport;
//     } catch (error) {
//         if(error.statusCode == StatusCodes.NOT_FOUND){
//             throw new AppError("The airport you requested couldn't be found!", error.statusCode)
//         }
//         throw new AppError("Cannot fetch data of the aiport", StatusCodes.INTERNAL_SERVER_ERROR);
        
//     }
// }

module.exports = {
    createFlight,
    getAllFlights
}