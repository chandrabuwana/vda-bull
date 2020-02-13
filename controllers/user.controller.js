const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

function registerUser (req,res){
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  User.create({
    namaLengkap: req.body.namaLengkap,
    nik: req.body.nik,
    level: req.body.level,
    email: req.body.email,
    password: hash,
    role: req.body.role||'user',
    division: req.body.division,
    rate: 0,
    score: 0
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
function getAllUser (req,res){
  User.find({})
  .populate('division')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

function loginUser (req,res){
  // console.log(req.body.nik)
  // console.log(req.body.password)
  User.findOne({
    nik: req.body.nik
  })
  .populate('division')
  .then((dataLoginUser)=>{
    // console.log(dataLoginUser)
    if(bcrypt.compareSync(req.body.password, dataLoginUser.password)){
      const salt = bcrypt.genSaltSync(10)
      var passwordHasBeenHash = bcrypt.hashSync(dataLoginUser.password, salt)
      
      var token = jwt.sign ({
        id: dataLoginUser._id,
        namaLengkap: dataLoginUser.namaLengkap,
        password:passwordHasBeenHash,
        nik: dataLoginUser.nik,
        level: dataLoginUser.level,
        email: dataLoginUser.email,
        role: dataLoginUser.role,
        rate: dataLoginUser.rate,
        score: dataLoginUser.score,
        division: dataLoginUser.division,
      },'vda')
      res.send(token)
    }else{
      res.send(err)
    }
  })
  .catch((err)=>{
    res.send(err)
  })
}

function forgotPassword (req,res) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  User.findOneAndUpdate({
    nik:req.body.nik,
    email:req.body.email,
  },{
    password:hash,
    namaLengkap: req.body.namaLengkap,
    level: req.body.level,
    email: req.body.email,
    division: req.body.division,
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

function gantiPassword (req,res) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  User.findOneAndUpdate({
    nik:req.body.nik,
  },{
    password:hash,
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}


function getDataOneUser (req,res){
  User.findOne({
    nik: req.body.nik
  })
  .populate('division')
  .then((dataLoginUser)=>{
    res.send(dataLoginUser)
  })
  .catch((err)=>{
    res.send(err)
  })
}

function deleteUser (req,res){
  User.findOneAndDelete({
    nik:req.body.nik
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

// =================================================================
module.exports={
  registerUser,
  loginUser,
  getAllUser,
  getDataOneUser,
  forgotPassword,
  deleteUser,
  gantiPassword
}