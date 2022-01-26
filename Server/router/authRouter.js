const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const auth = require('../middleware/auth')

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/logout', authController.logout)
router.post('/refresh_token', authController.genAccessToken)
router.post('/changepw', auth, authController.changePassword)

module.exports = router