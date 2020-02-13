const express = require('express')
const router = express.Router()

const valueController =require('../controllers/value.controller')

router.post('/post', valueController.createValue)
router.get('/get/all', valueController.getDataAllValue)
router.put('/put', valueController.updateValue)
router.delete('/delete', valueController.deleteValue)

module.exports=router