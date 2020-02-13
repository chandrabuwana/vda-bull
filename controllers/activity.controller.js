const Activity = require('../models/activity.model')

const createActivity = function (req,res) {
  Activity.create({
    nameActivity: req.body.nameActivity,
    dateActivity: new Date(),
    userInchargeId: req.body.userInchargeId,
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataByActivity = function (req,res) {
  Activity.find({
    nameActivity: req.body.nameActivity
  })
  .populate('userInchargeId')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
function getDataAllActivity (req,res){
  Activity.find({})
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataUserGetActivity = function (req,res) {
  Activity.find({
    userInchargeId: req.body.userInchargeId
  })
  .populate('userInchargeId')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const updateActivity = function(req,res){
  Activity.findByIdAndUpdate(req.body.id,{
    nameActivity:req.body.nameActivity
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const deleteActivity = function (req,res){
  Activity.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

module.exports={
  createActivity,
  getDataByActivity,
  getDataUserGetActivity,
  updateActivity,
  deleteActivity,
  getDataAllActivity
}
