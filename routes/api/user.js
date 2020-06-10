const express = require('express');
const UserController = require('../../controllers/UserController');

const router = express.Router()

const userController = new UserController()

router.get('/', userController.index);
router.get('/authenticate', userController.show);
router.post('/subscribe', userController.create);

module.exports = router;