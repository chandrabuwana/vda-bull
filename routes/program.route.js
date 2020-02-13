const express = require('express')
const router = express.Router()

const programController =require('../controllers/program.controller')

router.post('/post', programController.createProgram)
router.post('/get', programController.getDataByProgram)
router.get('/get/all', programController.getDataAllProgram)
router.post('/get/getDataUserProgram', programController.getDataUserGetProgram)
router.put('/put', programController.updateProgram)
router.delete('/delete', programController.deleteProgram)

module.exports=router