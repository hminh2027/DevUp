const express = require('express')
const router = express.Router()
const projectController = require('../controller/projectController')
const auth = require('../middleware/auth')

router.post('/', auth, projectController.createProject)
router.post('/:id/share', auth, projectController.shareProject)
router.get('/own', auth, projectController.getOwnProjects)
router.get('/share', auth, projectController.getShareProjects)
router.patch('/:id/changeEditable', auth, projectController.changeEditable)
router.patch('/:id/rename', auth, projectController.renameProject)
router.patch('/:id/received', auth, projectController.deleteReceivedProject)
router.patch('/:id', auth, projectController.saveProject)
router.delete('/:id', auth, projectController.deleteProject)

module.exports = router