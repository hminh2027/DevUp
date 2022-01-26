const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const postController = require('../controller/postController')

router.post('/', auth, postController.createPost)
router.post('/:id/share', auth, postController.sharePost)

router.get('/', auth, postController.getPosts)
router.get('/:id', auth, postController.getPost)
router.get('/user_posts/:id', auth, postController.getUserPosts)

router.patch('/:id', auth, postController.updatePost)
router.patch('/:id/like', auth, postController.likePost)
router.patch('/:id/unlike', auth, postController.unlikePost)
router.patch('/:id/save', auth, postController.savePost)
router.patch('/:id/unsave', auth, postController.unsavePost)

router.delete('/:id', auth, postController.deletePost)

module.exports = router