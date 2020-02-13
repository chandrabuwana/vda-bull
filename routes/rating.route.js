const express = require('express')
const router = express.Router()

const ratingController =require('../controllers/rating.controller')

router.post('/post', ratingController.createRating)
router.post('/get', ratingController.getDataUserGiftRating)
router.post('/get/dinilai', ratingController.getDataUserGetRating)
router.put('/put', ratingController.updateRating)
router.delete('/delete', ratingController.deleteRating)

module.exports=router