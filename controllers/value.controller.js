const Value = require('../models/value.model')

const createValue = function (req,res) {
  Value.create({
    valueName: req.body.valueName,
    keywordsId: req.body.keywordsId
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
function getDataAllValue (req,res){
  Value.find({})
  .populate('keywordsId')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const updateValue = function(req,res){
  Value.findByIdAndUpdate(req.body.id,{
    ValueName: req.body.keywordName,
    keywordsId: req.body.keywords
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const deleteValue = function (req,res){
  Value.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

module.exports={
  createValue,
  getDataAllValue,
  updateValue,
  deleteValue
}