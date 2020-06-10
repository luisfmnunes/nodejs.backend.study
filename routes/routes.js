const express = require('express');
const router = express.Router()
const todoRoute = require('./api/todo')
const roomRoute = require('./api/room')
const userRoute = require('./api/user')

router.use('/todo',todoRoute)
router.use('/room',roomRoute)
router.use('/user',userRoute)

module.exports = router