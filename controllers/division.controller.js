const Division = require('../models/division.model')
// const User = require('../models/user.model')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const createDivision = function (req,res) {
  Division.create({
    division: req.body.division,
    userIdHead: req.body.userIdHead ? req.body.userIdHead : null,
    divisionUserId: req.body.divisionUserId ? req.body.divisionUserId : null,
  })
  .then((data)=>{
    // console.log(req.body.headUserId)
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataDivision = function (req,res) {
  Division.find({
    division: req.body.division
  })
  .populate('divisionUserId')
  .populate('userIdHead')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getAllDataDivision = function (req,res) {
  Division.find({})
  .populate('divisionUserId')
  .populate('userIdHead')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataDivisionUser = function (req,res) {
  Division.find({
    divisionUserId: req.body.divisionUserId
  })
  .populate('divisionUserId')
  .populate('userIdHead')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataDivisionHeadUser = function (req,res) {
  Division.find({
    userIdHead: req.body.userIdHead
  })
  .populate('divisionUserId')
  .populate('userIdHead')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const updateDivision = function(req,res){
  Division.findByIdAndUpdate(req.body.id,{
    division:req.body.division,
    userIdHead: req.body.userIdHead ? req.body.userIdHead : null,
    divisionUserId: req.body.divisionUserId ? req.body.divisionUserId : null,
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const deleteDivision = function (req,res){
  Division.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

module.exports={
  createDivision,
  getDataDivision,
  getDataDivisionUser,
  updateDivision,
  deleteDivision,
  getDataDivisionHeadUser,
  getAllDataDivision
}