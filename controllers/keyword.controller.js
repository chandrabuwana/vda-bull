const Keyword = require('../models/keyword.model')

const createKeywordName = function (req,res) {
  Keyword.create({
    keywordName: req.body.keywordName,
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
function getDataAllKeyword (req,res){
  Keyword.find({})
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const getDataByKeywordName = function (req,res) {
  Keyword.find({
    keywordName: req.body.keywordName
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const updateKeywordName = function(req,res){
  Keyword.findByIdAndUpdate(req.body.id,{
    keywordName:req.body.keywordName
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================
const deleteKeywordName = function (req,res){
  Keyword.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}
// =================================================================

module.exports={
  createKeywordName,
  getDataByKeywordName,
  updateKeywordName,
  deleteKeywordName,
  getDataAllKeyword
}