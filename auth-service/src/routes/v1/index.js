const express = require('express');

const { InfoController } = require('../../controllers');
const UserController = require('../../controllers/user-controller');
const { AuthRequestValidator } = require('../../middlewares');
// const { AuthRequestValidators } = require('../../middlewares/index');


const router = express.Router();

router.get('/info', InfoController.info);

router.post(
    '/signup',
    UserController.create
);

router.post(
    '/signin', 
    AuthRequestValidator.validateUserAuth,
    UserController.signIn
)

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
)

router.get(
    '/dummy', 
    (req, res) => {
        return res.status(200).json({
            message: "OK"
        })
    }
)

router.get(
    '/isAdmin', 
    AuthRequestValidator.validateIsAdminRequest,
    UserController.isAdmin
)

module.exports = router;