const Rating = require('../models/rating.model')
// const User = require('../models/user.model')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const createRating = function (req,res) {
  Rating.create({
    userGetId: req.body.userGetId,
    userGiftId: req.body.userGiftId,
    rating: req.body.rating,
    dateRating: new Date(),
    status: false
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataUserGiftRating = function (req,res) {
  Rating.find({
    userGiftId: req.body.userGiftId
  })
  .populate('userGiftId')
  .populate('userGetId')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataUserGetRating = function (req,res) {
  Rating.find({
    userGetId: req.body.userGetId
  })
  .populate('userGetId')
  .populate('userGiftId')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const updateRating = function(req,res){
  Rating.findByIdAndUpdate(req.body.id,{
    rating:req.body.rating
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const deleteRating = function (req,res){
  Rating.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

module.exports={
  createRating,
  getDataUserGiftRating,
  getDataUserGetRating,
  updateRating,
  deleteRating,
}