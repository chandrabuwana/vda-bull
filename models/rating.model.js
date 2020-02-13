const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
var ratingSchema = new mongoose.Schema({
  userGetId : {
    type: ObjectId,
    ref : 'Users'
  },
  userGiftId : {
    type: ObjectId,
    ref : 'Users'
  },
  userDinilaiId : {
    type: ObjectId,
    ref : 'Users'
  },
  rating:'number',
  status: Boolean,
  // type
  typeAssess: 'string', //beaplus or program
  typeAssessValue: 'string',
  typeAssessKeyword: {
    type: ObjectId,
    ref : 'Keywords'
  },
  typeProgram: {
    type: ObjectId,
    ref : 'Programs'
  },
  activity: {
    type: ObjectId,
    ref : 'Activities'
  },
  valueRating: 'number'
})

var Rating = mongoose.model('Ratings',ratingSchema)
module.exports = Rating
