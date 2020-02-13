const mongoose = require ("mongoose")
const ObjectId = mongoose.ObjectId

var ValuesSchema = mongoose.Schema({
  valueName: 'string',
  keywordsId: [{
    type: ObjectId,
    ref : 'Keywords'
  }],
})

var Value = mongoose.model('Values',ValuesSchema)
module.exports = Value
