const mongoose = require ("mongoose")
const ObjectId = mongoose.ObjectId
//user bisa 
//allencrypted
var userSchema = mongoose.Schema({
  namaLengkap: 'string',
  nik:{
    type: 'string',
    unique: true
  },
  password: 'string',
  level: 'number',
  role: 'string',
  email: 'string',
  division: {
    type: ObjectId,
    ref: 'Divisions'
  },
  rate: 'number',
  score: 'number'
})
var User = mongoose.model('Users',userSchema)
module.exports = User
