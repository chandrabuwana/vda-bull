const Program = require('../models/program.model')

const createProgram = function (req,res) {
  // {
  //   "nameProgram": "Exship Program",
  //   "actvityId": [
  //     {
  //       "nameActivity": "5c822899b6086e47d697613f",
  //       "valueChoice": [
  //         {
  //           "nameValue": "5c854d81101c72372be352e6",
  //           "choiceKeyword": [
  //             "5c8225361aba4846c1c6de9e",
  //             "5c8225411aba4846c1c6de9f",
  //             "5c8225571aba4846c1c6dea1"
  //           ]
  //         },
  //         {

  //         }
  //       ]
  //     },
  //     {

  //     }
  //   ]
  // }
  Program.create({
    nameProgram: req.body.nameProgram,
    dateProgram: new Date(),
    userInchargeId: req.body.userInchargeId,
    actvityId: req.body.actvityId,
    // valueChoice: req.body.valueChoice
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
function getDataAllProgram (req,res){
  Program.find({})
  .populate({path: 'userInchargeId', populate: {path: 'division'}})
  .populate({path: 'actvityId.nameActivity'})
  .populate({path: 'actvityId.valueChoice.nameValue', populate: {path: 'keywordsId'}})
  .populate('actvityId.valueChoice.choiceKeyword')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataByProgram = function (req,res) {
  Program.find({
    nameProgram: req.body.nameProgram
  })
  .populate({path: 'userInchargeId', populate: {path: 'division'}})
  .populate({path: 'actvityId.nameActivity'})
  .populate('actvityId.valueChoice.nameValue', '-keywordsId')
  .populate('actvityId.valueChoice.choiceKeyword')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataUserGetProgram = function (req,res) {
  Program.find({
    userInchargeId: req.body.userInchargeId
  })
  .populate({path: 'userInchargeId', populate: {path: 'division'}})
  .populate({path: 'actvityId.nameActivity'})
  .populate({path: 'actvityId.valueChoice.nameValue', populate: {path: 'keywordsId'}})
  .populate('actvityId.valueChoice.choiceKeyword')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const updateProgram = function(req,res){
  // console.log('ini req body-012-30-1023-123',req.body)
  // console.log('-=-=-=-=-=-=-=-=-=-=-=-=',req.body.id)
  Program.findOneAndUpdate({_id: req.body.id},{
    // nameProgram: req.body.nameProgram
    nameProgram: req.body.nameProgram,
    // dateProgram: new Date(),
    // userInchargeId: req.body.userInchargeId,
    // actvityId: req.body.actvityId,
    // valueChoice: req.body.valueChoice ? req.body.valueChoice : null
  })
  .then((data)=>{
    // console.log('ini data-=-=-=-=12=3-123',data)
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const deleteProgram = function (req,res){
  Program.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

module.exports={
  createProgram,
  getDataByProgram,
  getDataUserGetProgram,
  updateProgram,
  deleteProgram,
  getDataAllProgram
}
