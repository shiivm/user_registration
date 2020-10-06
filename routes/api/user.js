const express = require('express');
const router = express.Router();

const UserController = require('../../controller/userController');

/**
 * @route POST api/user/register
 * @desc Register user 
 * @access Public
 */
router.post('/register',UserController.registerUser);

module.exports = router;