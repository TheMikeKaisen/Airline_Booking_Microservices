const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber, 
            capacity: req.body.capacity
        })
        SuccessResponse.message =  "Successfully created an airplane";
        SuccessResponse.data = airplane
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error
        return res.status(error.statusCode) .json(ErrorResponse);
    }
}


async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function destroyAirplane(req, res) {
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateAirplane(req, res) {
    try {
        if(!req.body.modelNumber && !req.body.capacity){
            throw new AppError("wrong Field!", StatusCodes.BAD_REQUEST)
        }
        const bodyData = new Object();
        const id = req.params.id;

        // if the airplane is present, then take its original value of modelNumber and capacity
        const airplaneData = await AirplaneService.getAirplane(req.params.id);
        bodyData.modelNumber = airplaneData.modelNumber
        bodyData.capacity = airplaneData.capacity

        // if modelNumber is present in the update request body, then update body.modelNumber
        if(req.body.modelNumber){
            bodyData.modelNumber = req.body.modelNumber
        }

        // if capacity is present in the update request body, then update body.capacity
        if(req.body.capacity){
            bodyData.capacity = req.body.capacity
        }
        const airplane = await AirplaneService.updateAirplane(id, bodyData);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}