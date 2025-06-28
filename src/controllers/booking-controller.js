const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');

// const bookingService = new BookingService();

class BookingController {

    constructor() {
        this.bookingService = new BookingService
    }

    async create (req, res) {
        try {
            console.log("FROM BOOKING CONTROLLER");
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController