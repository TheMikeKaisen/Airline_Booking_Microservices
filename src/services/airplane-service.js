
const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories')

const airplaneRepository = new AirplaneRepository();
const AppError = require('../utils/errors/app-error');

async function createAirplane(data) {

    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){

            let explanations = [];
            error.errors.forEach((err)=>{
                explanations.push(err.message);
            })
            console.log(explanations)
            throw new AppError(explanations, StatusCodes.BAD_REQUEST)
            
        }
        throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR)
        // throw error;
    }

}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of all the airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function destroyAirplane(id) {
    try {
        const airplane = await airplaneRepository.destroy(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of all the airplanes", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}