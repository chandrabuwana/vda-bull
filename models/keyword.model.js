const mongoose = require ("mongoose")

var keywordsSchema = mongoose.Schema({
  keywordName: 'string'
})

var Keywords = mongoose.model('Keywords',keywordsSchema)
module.exports = Keywords
