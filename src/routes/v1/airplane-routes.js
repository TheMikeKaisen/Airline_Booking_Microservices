const express = require('express')
const router = express.Router();

const {AirplaneController} = require('../../controllers')

// import middleware
const {AirplaneMiddleware} = require('../../middlewares');

// POST: /api/v1/airplanes
router.post('/',AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane)

router.get('/', AirplaneController.getAirplanes);

module.exports = router;