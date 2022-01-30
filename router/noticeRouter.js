const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const noticeController = require('../controller/noticeController')

router.post('/', auth, noticeController.createNotice)
router.patch('/:id/read', auth, noticeController.readNotice)
router.patch('/:id/unread', auth, noticeController.unreadNotice)
router.patch('/read', auth, noticeController.readNotices)
router.delete('/postDelete', auth, noticeController.deletePostNotices)
router.delete('/:id', auth, noticeController.deleteNotice)
router.delete('/', auth, noticeController.deleteNotices)
router.get('/', auth, noticeController.getNotices)

module.exports = router