const express = require('express')
const router = express.Router();

const {AirplaneController} = require('../../controllers')

// import middleware
const {AirplaneMiddleware} = require('../../middlewares');

// POST: /api/v1/airplanes
router.post('/',AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane)

router.get('/', AirplaneController.getAirplanes);

router.get('/:id', AirplaneController.getAirplane)

router.delete('/:id', AirplaneController.destroyAirplane);

module.exports = router;