const express = require('express')
const router = express.Router()
var kue = require("kue"),
  queue = kue.createQueue();
const commentController = require('../controllers/comment.controller')
const commentForChart = require('../controllers/commentForChart.controller')
const commentForstAdmin = require('../controllers/commentForFirstAssessment.controllers')
const commentForDetailUser = require('../controllers/commentForDetailUser.controller')

router.post('/post', commentController.createComment,function (req,res){
  var job = queue
    .create("test", {
      title: "job ran at " + Date.now()
    })
    .save(function(err) {
      if (!err) console.log(job.id);
    });

  res.send(200);
})
router.post('/get', commentController.getDataUserGiftComment)
router.post('/get/dinilai', commentController.getDataUserGetComment)
router.get('/get/all', commentController.getDataAllUserComment)
router.post('/get/commentForChart', commentForChart.getDataAllForOneUser)
router.put('/put', commentController.updateComment)
router.delete('/delete', commentController.deleteComment)

router.post('/post/admin/createcomment', commentForstAdmin.firstAssessmentProgram)
router.post('/get/admin/createcomment', commentForstAdmin.getFirstAssessmentProgram)
router.post('/get/admin/editcomment', commentForstAdmin.editFirstAssessmentProgram)

router.post('/get/user/fordetails', commentForDetailUser.getDataUserDetail)

module.exports = router
