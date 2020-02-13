const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
var CommentFirst = new mongoose.Schema({
  // USER
  userGetComment: {
    type: ObjectId,
    ref : 'Users'
  },
  totalRating: 'number',
  totalValueRating: 'number',
  typeProgram: {
    type: ObjectId,
    ref : 'Programs'
  },
  activity: {
    type: ObjectId,
    ref : 'Activities'
  },
  valueChoice: [{
    nameValue: {
      type: ObjectId,
      ref : 'Values'
    },
    choiceKeyword: [{
      nameKeyword: {
        type: ObjectId,
        ref : 'Keywords'
      },
      valueKeyword: 'number'
    }]
  }],
  dateComment: 'date',
  status: Boolean
})

var CommentFirst = mongoose.model('CommentFirsts',CommentFirst)
module.exports = CommentFirst
