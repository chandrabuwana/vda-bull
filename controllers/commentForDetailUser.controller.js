const CommentFirst = require('../models/commentFirstFromAdmin.model')


const getDataUserDetail = function(req,res){
  CommentFirst.find({
    userGetComment: req.body.userGetComment
  })
  .populate({path: 'valueChoice.choiceKeyword.nameKeyword'})
  .populate({path: 'valueChoice.nameValue'})
  .then((dataCommentAll) => {
    let acumulate = []
    for (let idx = 0; idx < dataCommentAll.length; idx++) {
      for (let idxValueProgramActivity = 0; idxValueProgramActivity < dataCommentAll[idx].valueChoice.length; idxValueProgramActivity++) {
        let acumulateInd = {
          valueName: dataCommentAll[idx].valueChoice[idxValueProgramActivity].nameValue.valueName,
          totalValue: 0,
          totalKeywordValue: []
        }
        let countValue = 0
        let choiceKeyword = dataCommentAll[idx].valueChoice[idxValueProgramActivity].choiceKeyword

        for (let idxChoiceKeyword = 0; idxChoiceKeyword < choiceKeyword.length; idxChoiceKeyword++) {
          
          countValue += choiceKeyword[idxChoiceKeyword].valueKeyword
          acumulateInd.totalKeywordValue.push({
            keywordName: choiceKeyword[idxChoiceKeyword].nameKeyword.keywordName,
            valueKeyword: choiceKeyword[idxChoiceKeyword].valueKeyword
          })
        }
        acumulateInd.totalValue = countValue / choiceKeyword.length
        acumulate.push(acumulateInd)
      }
    }
    // console.log('========>', JSON.stringify(acumulate))
    res.send(acumulate)
  })
}

module.exports={
  getDataUserDetail,
}