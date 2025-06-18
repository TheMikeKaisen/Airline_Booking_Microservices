
const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories')

const cityRepository = new CityRepository();
const AppError = require('../utils/errors/app-error');


async function createCity(data){

    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        // console.log(error);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){

            let explanations = [];
            error.errors.forEach((err)=>{
                explanations.push(err.message);
            })
            console.log(explanations)
            throw new AppError(explanations, StatusCodes.BAD_REQUEST)
            
        }
        

        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR)
    }

}

async function getCities(){
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError("Cannot fetch data of all the cities", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city id you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of all the city", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function destroyCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city name you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of all the city", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The city name you requested couldn't be found!", error.statusCode)
        }
        throw new AppError("Cannot fetch data of all the city", StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}


module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}
