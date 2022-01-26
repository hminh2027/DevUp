const express = require('express')
const router = express.Router()
const messageController = require('../controller/messageController')
const auth = require('../middleware/auth')

router.post('/', auth, messageController.createMessage)


module.exports = router