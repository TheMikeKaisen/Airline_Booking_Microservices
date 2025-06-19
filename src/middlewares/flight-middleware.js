const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
    


    const requiredFields = [
        "flightNumber", "airplaneId", "departureAirportId", "arrivalAirportId",
        "arrivalTime", "departureTime", "price", "totalSeats"
      ];
      
      for (const field of requiredFields) {
        if (!req.body[field] || req.body[field].trim==="") {
            ErrorResponse.message = "Something went wrong while creating flight";
            ErrorResponse.error = new AppError([`${field} not found in the incoming request.`], StatusCodes.BAD_REQUEST)
           
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
      }





    // if(!req.body.flightNumber || req.body.flightNumber.trim === ""){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["flightNumber not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.airplaneId || req.body.airplaneId.trim === ""){
    //     ErrorResponse.message = "Something went wrong while creating airport";
    //     ErrorResponse.error = new AppError(["airplaneId not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.departureAirportId){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["departureAirportId not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.arrivalAirportId){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["arrivalAirportId not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.arrivalTime){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["arrivalTime not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.departureTime){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["departureTime not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.price){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["price not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    // if(!req.body.totalSeats){
    //     ErrorResponse.message = "Something went wrong while creating flight";
    //     ErrorResponse.error = new AppError(["totalSeats not found in the incoming request."], StatusCodes.BAD_REQUEST)
       
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    // }
    next();
}

module.exports = {
    validateCreateRequest
}