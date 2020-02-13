const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

var programSchema = new mongoose.Schema({
  userInchargeId : [{
    type: ObjectId,
    ref : 'Users'
  }],
  nameProgram:{
    type:'string',
    unique:true
  },
  actvityId:[{
    nameActivity: {
      type: ObjectId,
      ref : 'Activities'
    },
    valueChoice: [{
      nameValue: {
        type: ObjectId,
        ref : 'Values'
      },
      choiceKeyword: [{
        type: ObjectId,
        ref : 'Keywords'
      }]
    }],
  }],
  dateProgram: 'date',
})
var Program = mongoose.model('Programs',programSchema)
module.exports = Program