
const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories')

const flightRepository = new FlightRepository();
const AppError = require('../utils/errors/app-error');
const { CompareDateTimeHelper } = require('../utils/helpers');

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
}