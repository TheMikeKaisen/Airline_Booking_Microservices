const express = require('express');

const { InfoController, BookingController} = require('../../controllers');
const { createChannel } = require('../../utility/messageQueue');

const router = express.Router();
const bookingController = new BookingController();

router.get('/info', InfoController.info);
router.post('/bookings', bookingController.createBooking)
router.post('/publish', bookingController.sendMessageToQueue)

module.exports = router;