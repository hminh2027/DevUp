const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const userController = require('../controller/userController')

router.get('/', auth, userController.getUsers)
router.get('/search' , auth, userController.searchUser)
// router.get('/searchFriend', auth, userController.searchFriend)
router.get('/suggest', auth, userController.getSuggestion)
router.get('/:id', auth, userController.getUser)

router.patch('/:id/follow', auth, userController.followUser)
router.patch('/:id/unfollow', auth, userController.unfollowUser)
router.patch('/', auth, userController.updateUser)


module.exports = router