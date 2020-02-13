const express = require('express')
const router = express.Router()

const graphic = require('../controllers/graphic.controller')

router.get('/get',graphic.getAllCommentAndProcessingGraphic)
router.get('/get/Assessment',graphic.getAllCommentAndProcessingGraphicAssessment)

module.exports=router
