const express = require('express')
const router = express.Router();

const {FlightController} = require('../../controllers')
const {FlightMiddleware} = require('../../middlewares')

// POST: /api/v1/airport
router.post('/', FlightMiddleware.validateCreateRequest, FlightController.createFlight)

module.exports = router;