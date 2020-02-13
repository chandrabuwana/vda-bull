const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId
var commentSchema = new mongoose.Schema({
  // USER
  userGetComment : {
    type: ObjectId,
    ref : 'Users'
  },
  userGiftComment : {
    type: ObjectId,
    ref : 'Users'
  },
  // TIPE (USER or ADMIN)
  typeComment: 'string',
  // RATE, COMMENT AND VALUE
  rating:'number',
  originalRate: 'number',
  valueRating: 'number',
  comment:'string',
  // TIPE (USER COMMENT = BEAPLUS or PROGRAM)
  typeAssess: 'string', //BE A PLUS or PROGRAMS
  // PROGRAM AND ACTIVITY OF PROGRAM
  typeProgram: {
    type: ObjectId,
    ref : 'Programs'
  },
  activity: {
    type: ObjectId,
    ref : 'Activities'
  },
  // VALUE AND KEYWORD
  typeAssessValue: {
    type: ObjectId,
    ref : 'Values'
  },
  typeAssessKeyword: [{
    type: ObjectId,
    ref : 'Keywords'
  }],
  // DATE AND STATUS
  dateComment: 'date',
  valueProgramActivity: [{
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
  status: Boolean,
})

var Comment = mongoose.model('Comments',commentSchema)
module.exports = Comment
