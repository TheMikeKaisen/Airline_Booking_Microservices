const express = require('express')
const router = express.Router();

const {AirportController} = require('../../controllers')
const {AirportMiddleware} = require('../../middlewares')

// import middleware
// const {AirplaneMiddleware} = require('../../middlewares');

// POST: /api/v1/airport
router.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport)

// GET: /api/v1/airport
router.get('/', AirportController.getAirports)

// GET: /api/v1/airport/id
router.get('/:id', AirportController.getAirport)

// DELETE: /api/v1/airport/id
router.delete('/:id', AirportController.destroyAirport)

// update: /api/v1/airport/id
router.patch('/:id', AirportController.updateAirport)

module.exports = router;