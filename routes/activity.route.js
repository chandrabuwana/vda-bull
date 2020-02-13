const express = require('express')
const router = express.Router()

const activityController =require('../controllers/activity.controller')

router.post('/post', activityController.createActivity)
router.post('/get', activityController.getDataByActivity)
router.get('/get/all', activityController.getDataAllActivity)
router.post('/get/getDataUserActivity', activityController.getDataUserGetActivity)
router.put('/put', activityController.updateActivity)
router.delete('/delete', activityController.deleteActivity)

module.exports=router