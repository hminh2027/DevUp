const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')
const auth = require('../middleware/auth')

router.post('/', auth, commentController.createComment)
router.delete('/:id', auth, commentController.deleteComment)
router.patch('/:id', auth, commentController.updateComment)

module.exports = router