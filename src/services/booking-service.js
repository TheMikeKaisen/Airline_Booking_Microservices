// const axios = require('axios');

const { BookingRepository } = require('../repositories');
const { FLIGHT_SERVICE_PATH } = require('../config/serverConfig');
const { ServiceError } = require('../utility/errors');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        
    }
}

module.exports = BookingService;