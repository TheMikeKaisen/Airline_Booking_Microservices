const express = require('express')

const router = express.Router();

const {InfoController} = require('../../controllers')
const airplaneRoutes = require('./airplane-routes')
const cityRoutes = require('./city-routes')
const airportRoutes = require('./airport-routes')
const flightRoutes = require('./flight-routes')

router.use('/airplanes', airplaneRoutes)
router.use('/city', cityRoutes)
router.use('/airport', airportRoutes)
router.use('/flight', flightRoutes)


router.get('/info', InfoController.info)


module.exports = router;