const express = require('express')
const router = express.Router()

const keywordController =require('../controllers/keyword.controller')

router.post('/post', keywordController.createKeywordName)
router.get('/get/all', keywordController.getDataAllKeyword)
router.post('/get', keywordController.getDataByKeywordName)
router.put('/put', keywordController.updateKeywordName)
router.delete('/delete', keywordController.deleteKeywordName)

module.exports=router