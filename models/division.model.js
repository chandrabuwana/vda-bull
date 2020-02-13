const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
// DIVISION: (model)
var divisionSchema = new mongoose.Schema({
  division: {
    type:'string'
  },
  divisionUserId:[{
    type:ObjectId,
    ref:'Users'
  }],
  userIdHead:[{
    type:ObjectId,
    ref:'Users'
  }],
})

var Division = mongoose.model('Divisions',divisionSchema)
module.exports = Division