const express = require('express');

const { InfoController } = require('../../controllers');
const UserController = require('../../controllers/user-controller');
// const { AuthRequestValidators } = require('../../middlewares/index');


const router = express.Router();

router.get('/info', InfoController.info);

router.post(
    '/signup',
    UserController.create
);

module.exports = router;