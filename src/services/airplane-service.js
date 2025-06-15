
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

module.exports = {
    createAirplane
}