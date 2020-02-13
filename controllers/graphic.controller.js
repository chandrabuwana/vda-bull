const Comment = require('../models/comment.model')

function getAllCommentAndProcessingGraphic (req,res){
  Comment.find({})
  .populate('valueProgramActivity.nameValue', '-keywordsId')
  .populate('valueProgramActivity.choiceKeyword.nameKeyword')
  .then(data => {
    const allValue = []
    const numbernya = 1
    for (let idxLoopComm = 0; idxLoopComm < data.length; idxLoopComm++) {
      const valueForLoop = data[idxLoopComm].valueProgramActivity
      for (let idxLoopValue = 0; idxLoopValue < valueForLoop.length; idxLoopValue++) {
        const valueName = valueForLoop[idxLoopValue].nameValue.valueName
        let findIndexAllValue = allValue.findIndex(dataAllValue => {
          return dataAllValue.name === valueName
        })
        if (findIndexAllValue !== -1) {
          const mount = data[idxLoopComm].dateComment.getMonth()
          allValue[findIndexAllValue].value[mount] += 1
        } else {
            let objectSend = {
              name: valueName,
              value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            const mount = data[idxLoopComm].dateComment.getMonth()
            objectSend.value[mount] += numbernya
            allValue.push(objectSend)
        }
      }
    }
    res.send(allValue)
  })
  .catch(err => {
    res.send(err)
  })
}

function getAllCommentAndProcessingGraphicAssessment (req,res){
  Comment.find({})
  .populate('valueProgramActivity.nameValue', '-keywordsId')
  .populate('valueProgramActivity.choiceKeyword.nameKeyword')
  .then(data => {
    const allValue = {
      name: 'Semua Assessment',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    for (let idxLoopComm = 0; idxLoopComm < data.length; idxLoopComm++) {
      const mount = data[idxLoopComm].dateComment.getMonth()
      allValue.data[mount] += 1
    }
    res.send(allValue)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports={
  getAllCommentAndProcessingGraphic,
  getAllCommentAndProcessingGraphicAssessment
}