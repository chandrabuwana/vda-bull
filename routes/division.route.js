const express = require('express')
const router = express.Router()

const divisionController = require('../controllers/division.controller')

router.post('/post', divisionController.createDivision)
router.post('/get', divisionController.getDataDivision)
router.get('/getall', divisionController.getAllDataDivision)
router.post('/get/getDataDivisionUser', divisionController.getDataDivisionUser)
router.post('/get/getDataDivisionHeadUser', divisionController.getDataDivisionHeadUser)
router.put('/put', divisionController.updateDivision)
router.delete('/delete', divisionController.deleteDivision)

module.exports = router
