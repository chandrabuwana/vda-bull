const CommentFirst = require('../models/commentFirstFromAdmin.model')
const Program = require('../models/program.model')
const helper = require('../helpers/index')
const User = require('../models/user.model')


const firstAssessmentProgram = function(req,res){
  // EXAMPLE VALUE SEND

  // {
  //   "userGetComment": "5c876be59a3bbb4fe2e0f701",
  //   "totalRating": 5,
  //   "totalValueRating": 700,
  //   "typeProgram": "5c8d47fa1b549433ed92c7aa",
  //   "activity": "5c8229f6b6086e47d6976147",
  //   "valueChoice": [{
  //     "nameValue": "5c854d1b101c72372be352e5",
  //     "choiceKeyword": [{
  //       "nameKeyword": "5c85468949964328c618ae35",
  //       "valueKeyword": 300
  //     }, {
  //       "nameKeyword": "5c85436649964328c618ae1b",
  //       "valueKeyword": 500
  //     }]
  //   }]
  // }

  const valueChoice = typeof req.body.valueChoice === 'string' ? JSON.parse(req.body.valueChoice) : req.body.valueChoice
  const scoreAqumulate = helper.triggerAcumulateRateCommentFirstFromAdmin(valueChoice)

  CommentFirst.create({
    userGetComment: req.body.userGetComment,
    totalRating: scoreAqumulate.countRate,
    totalValueRating: scoreAqumulate.countAll,
    typeProgram: req.body.typeProgram,
    activity: req.body.activity,
    valueChoice: valueChoice,
    dateComment: new Date(),
    status: true
  }).then((data) => {
    User.findByIdAndUpdate(req.body.userId,{
      rate: scoreAqumulate.countRate,
      score: scoreAqumulate.countAll
    })
    .then((dataUser)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
  }).catch((err) => {
    res.send(err)
  })
}

const editFirstAssessmentProgram = function(req, res) {
  
  const valueChoice = typeof req.body.valueChoice === 'string' ? JSON.parse(req.body.valueChoice) : req.body.valueChoice
  const scoreAqumulate = helper.triggerAcumulateRateCommentFirstFromAdmin(valueChoice)
  
  CommentFirst.findByIdAndUpdate(req.body.id, {
    userGetComment: req.body.userGetComment,
    totalRating: scoreAqumulate.countRate,
    totalValueRating: scoreAqumulate.countAll,
    typeProgram: req.body.typeProgram,
    activity: req.body.activity,
    valueChoice: valueChoice,
    dateComment: new Date(),
    status: true
  }).then((data) => {
    User.findByIdAndUpdate(req.body.userId,{
      rate: scoreAqumulate.countRate,
      score: scoreAqumulate.countAll
    })
    .then((dataUser)=>{
      res.send(data)
    })
    .catch((err)=>{
      res.send(err)
    })
  }).catch((err) => {
    res.send(err)
  })
}

const getFirstAssessmentProgram = (req, res) => {
  CommentFirst.find({
    userGetComment: req.body.userGetComment
  })
  .populate('userGetComment')
  // .populate('typeProgram', 'nameProgram')
  // .populate('activity', 'nameActivity')
  .populate('valueChoice.nameValue', 'valueName')
  .populate('valueChoice.choiceKeyword.nameKeyword', 'keywordName')
  .then((data) => {
    const arrayData = []
    for (let index = 0; index < data.length; index++) {
      let object = {
        id: data[index]._id,
        userGetComment: data[index].userGetComment.namaLengkap,
        totalRating: data[index].totalRating,
        totalValueRating: data[index].totalValueRating,
        typeProgram: data[index].typeProgram.nameProgram,
        activity: data[index].activity.nameActivity,
        valueChoice: []
      }
      for (let idxValue = 0; idxValue < data[index].valueChoice.length; idxValue++) {
        let objectValue = {
          value: data[index].valueChoice[idxValue].nameValue.valueName,
          keyword: []
        }
        for (let idxKey = 0; idxKey < data[index].valueChoice[idxValue].choiceKeyword.length; idxKey++) {
          let objectKey = {
            nameKey: data[index].valueChoice[idxValue].choiceKeyword[idxKey].nameKeyword.keywordName,
            nilai: data[index].valueChoice[idxValue].choiceKeyword[idxKey].valueKeyword
          }
          objectValue.keyword.push(objectKey)
        }
        object.valueChoice.push(objectValue)
      }
      arrayData.push(object)
    }
    res.send(arrayData)
  })
}

module.exports={
  firstAssessmentProgram,
  getFirstAssessmentProgram,
  editFirstAssessmentProgram
}