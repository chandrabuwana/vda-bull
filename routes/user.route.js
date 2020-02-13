const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/login',userController.loginUser)
router.post('/register',userController.registerUser)
router.get('/get/all',userController.getAllUser)
router.post('/get/datauser', userController.getDataOneUser)
router.put('/changedata', userController.forgotPassword)
router.put('/changepassword', userController.gantiPassword)
router.delete('/delete',userController.deleteUser)
module.exports=router
