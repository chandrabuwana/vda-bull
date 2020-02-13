const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

var activitySchema = new mongoose.Schema({
  nameActivity: {
    type: 'string'
  },
  userInchargeId:[{
    type: ObjectId,
    ref: 'Users'
  }],
  dateActivity:'date'
})

var Activity = mongoose.model('Activities',activitySchema)
module.exports = Activity