
const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repositories')

const airportRepository = new AirportRepository();
const AppError = require('../utils/errors/app-error');

async function createAirport(data) {

    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {
        console.log("error in service")
        if(error.name == 'SequelizeValidationError'){

            let explanations = [];
            error.errors.forEach((err)=>{
                explanations.push(err.message);
            })
            console.log(explanations)
            throw new AppError(explanations, StatusCodes.BAD_REQUEST)
            
        }
        throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

async function getAirports(){
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airports", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of all the airport", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function destroyAirport(id) {
    try {
        const airport = await airportRepository.destroy(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of the airport", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}
async function updateAirport(id, data) {
    try {
        const airport = await airportRepository.update(id, data);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of the aiport", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}