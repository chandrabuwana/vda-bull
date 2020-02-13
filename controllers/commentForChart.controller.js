const Comment = require('../models/comment.model')
// const User = require('../models/user.model')
// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')

const getDataAllForOneUser = function (req,res) {
  // console.log("MULAI ===============================================================>", req.body.user)
  Comment.find({
    userGiftComment: req.body.user
  })
  .populate('userGetComment')
  .populate('userGiftComment')
  .populate('typeAssessKeyword')
  .populate('typeProgram')
  .populate('activity')
  .populate('typeAssessValue')
  .then((dataGiftCommentTo)=>{
    
    Comment.find({
      userGetComment: req.body.user
    })
    .populate('userGetComment')
    .populate('userGiftComment')
    .populate('typeAssessKeyword')
    .populate('typeProgram')
    .populate('activity')
    .populate('typeAssessValue')
    .then((dataGetCommentFrom)=>{
      
      let yourself = { assessed: 0, assess: 0 }
      let subordinate = { assessed: 0, assess: 0 }
      let boss = { assessed: 0, assess: 0 }
      let partners = { assessed: 0, assess: 0 }
      console
      let dataDetails = []

      // meloop memberikan komen ke mana
      // MENILAI
      if (JSON.stringify(dataGiftCommentTo) !== '[]') {
        for (let index = 0; index < dataGiftCommentTo.length; index++) {
          if (dataGiftCommentTo[index].userGiftComment && dataGiftCommentTo[index].userGetComment) {
            let GiftCommentDivision = String(dataGiftCommentTo[index].userGiftComment.division)
            let GetCommentDivision = String(dataGiftCommentTo[index].userGetComment.division)
            let GiftCommentLevel = dataGiftCommentTo[index].userGiftComment.level
            let GetCommentLevel = dataGiftCommentTo[index].userGetComment.level
            let GetCommentId = dataGiftCommentTo[index].userGetComment._id
            let GiftCommentId = dataGiftCommentTo[index].userGiftComment._id
            // console.log('===============> '+index+' - '+dataGiftCommentTo.length, dataGiftCommentTo[index].userGetComment+'\n'+dataGiftCommentTo[index].userGiftComment)

            if (
              // (GiftCommentDivision === GetCommentDivision) &&
               (GiftCommentLevel === GetCommentLevel)) {
              if (String(GetCommentId) === String(GiftCommentId)) {
                yourself.assess+=1 //untuk diri sendiri
              } else {
                partners.assess+=1 //menilai untuk ke partner
              }
            }

            if (
              // (GiftCommentDivision === GetCommentDivision) &&
               (GiftCommentLevel < GetCommentLevel)) {
              subordinate.assess+=1
            }

            if (
              // (GiftCommentDivision === GetCommentDivision) &&
               (GiftCommentLevel > GetCommentLevel)) {
              boss.assess+=1
            }

            // if (GiftCommentDivision !== GetCommentDivision) {
            //   if (GiftCommentLevel > GetCommentLevel) {
            //     boss.assess+=1
            //   } else {
            //     subordinate.assess+=1
            //   }
            // }

            // else {subordinate.assess+=0}
          }
        }
      }

      // meloop dapat komen dari mana
      //DINILAI
      if (JSON.stringify(dataGetCommentFrom) !== '[]') {
        for (let index = 0; index < dataGetCommentFrom.length; index++) {
          if (dataGetCommentFrom[index].userGiftComment && dataGetCommentFrom[index].userGetComment) {
            let GiftCommentDivision = String(dataGetCommentFrom[index].userGiftComment.division)
            let GetCommentDivision = String(dataGetCommentFrom[index].userGetComment.division)
            let GiftCommentLevel = dataGetCommentFrom[index].userGiftComment.level
            let GetCommentLevel = dataGetCommentFrom[index].userGetComment.level
            let GetCommentId = dataGetCommentFrom[index].userGetComment._id
            let GiftCommentId = dataGetCommentFrom[index].userGiftComment._id

            // console.log('===============> '+index+' - '+dataGetCommentFrom.length, dataGetCommentFrom[index].userGetComment+'\n'+dataGetCommentFrom[index].userGiftComment)

            if (  (GiftCommentLevel === GetCommentLevel)) {
              if (String(GetCommentId) === String(GiftCommentId)) {
                yourself.assessed+=1 //DINILAI diri sendiri
              } else {
                partners.assessed+=1// DINILAI partner
              }
            }

            if (
              // (GiftCommentDivision === GetCommentDivision) &&
               (GiftCommentLevel < GetCommentLevel)) {
                 // 1 < 7
              boss.assessed+=1 //dinilai BOS
            }

            if (
              // (GiftCommentDivision === GetCommentDivision) &&
               (GiftCommentLevel > GetCommentLevel)) {
                 // 1 > 7
              subordinate.assessed+=1//dinilai Bawahan
            }

            // if (GiftCommentDivision !== GetCommentDivision) {
            //   if (GiftCommentLevel > GetCommentLevel) {
            //     boss.assessed+=1
            //   } 
            //   else {
            //     subordinate.assessed+=1
            //   }
            // }

            // else {subordinate.assess+=0}
          }
        }
      }

      let object = [
        {
          for: 'Chart',
          data: [
            {
              Title: 'Yourself',
              valueOne: yourself.assessed,//dinilai
              valueTwo: yourself.assess //menilai
            },
            {
              Title: 'Subordinate',
              valueOne: subordinate.assessed,
              valueTwo: subordinate.assess
            },
            {
              Title: 'Boss',
              valueOne: boss.assessed,
              valueTwo: boss.assess
            },
            {
              Title: 'Partners',
              valueOne: partners.assessed,
              valueTwo: partners.assess
            }
          ]
        }, {
          for: 'Details',
          data: [
          ]
        }
        
      ]
      res.send(object)
    })
    .catch((err)=>{
    }) 
  })
  .catch((err)=>{
  })
}

module.exports={
  getDataAllForOneUser,
}