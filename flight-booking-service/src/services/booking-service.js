const axios = require('axios');

const { BookingRepository } = require('../repositories');
// const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utility/errors');
const serverConfig = require('../config/server-config');
const { ServerConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');
const { Enums } = require('../utility/common');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            // console.log(data);
            const flightId = data.flightId;

            // url of the micro-service that we want to request files from
            let getFlightURL = `${ServerConfig.FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

            // connecting to other micro-service using axios
            const response = await axios.get(getFlightURL);

            const flightData = response.data.data;

            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError(
                    'Something went wrong in the booking process',
                    'Insufficient seats',
                )
                
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;

            const bookingPayload = {...data, totalCost};

            const booking = await this.bookingRepository.create(bookingPayload);
            
            // now that the booking is done for given noOfSeats, we need to update the totalSeats count in flight service.
            let updateFlightURL = `${ServerConfig.FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

            await axios.patch(updateFlightURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});

            const finalBooking = await this.bookingRepository.update(booking.id, {status: Enums.BOOKING_STATUS.BOOKED})

            return finalBooking;
        } catch (error) {
            console.log("error in service: ", error);
            if(error.name == 'RepositoryError' || error.name == 'ValidationError') {
                throw error;
            }
            throw new ServiceError();
        }

    }
}

module.exports = BookingService;