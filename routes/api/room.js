const express = require('express')
const router = express.Router()
const RoomController = require('../../controllers/RoomController')

const roomController = new RoomController()

router.post('/create', roomController.create)

router.get('/', roomController.index)
router.patch('/start', roomController.update)
router.delete('/delete', roomController.delete)

module.exports = router