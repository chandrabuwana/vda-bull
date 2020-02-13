const Comment = require('../models/comment.model')
const helper = require('../helpers/index')
const CommentFirst = require('../models/commentFirstFromAdmin.model')
const Program = require('../models/program.model')
const User = require('../models/user.model')
const kue = require('kue');
const queue = kue.createQueue();

// MEMO: Membuat Komen Dan Rating Baru
const createComment = function (req,res) {
  var minute = 6000;
console.log('ini req.body------>',req.body)	
  queue.create( 'order',req.body ).delay( minute ).priority( 'high' ).save();

  queue.process('order', (job, done) => {
  

  req = {
    body: job.data
  }


// MEMO: Nilai Dasar
  const userGetComment = req.body.userGetComment
  const userGiftComment = req.body.userGiftComment
  const rating = req.body.rating
  const valueRating = req.body.valueRating
  const comment = req.body.comment
  const typeAssess = req.body.typeAssess
  const typeAssessValue = req.body.typeAssessValue
  const typeAssessKeyword = req.body.typeAssessKeyword
  const typeProgram = req.body.typeProgram
  const activity = req.body.activity
  const firstCommentEditPlan = {}

// MEMO: Cari Penilaian Pertama
  CommentFirst.find({
    userGetComment: userGetComment
  })
  .populate({path: 'valueChoice.choiceKeyword.nameKeyword'})
  .populate({path: 'valueChoice.nameValue'})
  .then((dataCommenFirst) => {
// MEMO: State Ulang
    firstCommentEditPlan._id = dataCommenFirst[0]._id
    firstCommentEditPlan.userGetComment = dataCommenFirst[0].userGetComment
    firstCommentEditPlan.totalRating = 0
    firstCommentEditPlan.totalValueRating = 0
    firstCommentEditPlan.typeProgram = dataCommenFirst[0].typeProgram
    firstCommentEditPlan.activity = dataCommenFirst[0].activity
    firstCommentEditPlan.valueChoice = []
    firstCommentEditPlan.dateComment = new Date()
    firstCommentEditPlan.status = true
// MEMO: Kondisi Be-A Plus atau bukan
    if (!typeProgram) {
      let valueProgramActivity = []
      let acumulateRate = {}

// MEMO: Looping Penilaian Awal (Cari Value-nya)
      for (let idx = 0; idx < dataCommenFirst[0].valueChoice.length; idx++) {
// MEMO: Buat Object Value Baru
        let object = {
          nameValue: dataCommenFirst[0].valueChoice[idx].nameValue._id,
          choiceKeyword: []
        }
// MEMO: Conditional -> Jika data Value sama dengan Data Value Yg dinilai
        if (dataCommenFirst[0].valueChoice[idx].nameValue._id == typeAssessValue) {
// MEMO: Looping Penilaian Awal (Cari Keyword-nya)
          for (let index = 0; index < dataCommenFirst[0].valueChoice[idx].choiceKeyword.length; index++) {
// MEMO: Buat Object Keyword Baru        
            let objectForValueKeyword = {
              nameKeyword: dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].nameKeyword._id,
              valueKeyword: 0
            }
// MEMO: Cari Score Impact
            var tryToGetScoreImpact = helper.triggerScoreImpactForBeAplus(dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword, rating)
// MEMO: Cari apakah Keyword sama dengan keyword yg dipilih
            let checkDataKeywordIndex = typeAssessKeyword.findIndex((data) => {
              return data == dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].nameKeyword._id
            })
// MEMO: Conditional -> Jika data ada pada daftar yg dipilih
            if (checkDataKeywordIndex == -1) {
              objectForValueKeyword.valueKeyword = dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword
              object.choiceKeyword.push(objectForValueKeyword)
            } else {
// MEMO: Simpan Value Keyword
              objectForValueKeyword.valueKeyword = dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword + tryToGetScoreImpact
// MEMO: Push Objek Keyword Baru
              object.choiceKeyword.push(objectForValueKeyword)
            }
          }
        } else {
// MEMO: Looping Penilaian Awal (Cari Keyword-nya)
          for (let index = 0; index < dataCommenFirst[0].valueChoice[idx].choiceKeyword.length; index++) {
// MEMO: Buat Object Value Baru
            let objectForValueKeyword = {
              nameKeyword: dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].nameKeyword._id,
              valueKeyword: 0
            }
// MEMO: Simpan Value Keyword
            objectForValueKeyword.valueKeyword = dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword
// MEMO: Push Objek Keyword Baru
            object.choiceKeyword.push(objectForValueKeyword)
          }
        }
// MEMO: Push Array Of Object Semua Value dan Keyword Baru
        valueProgramActivity.push(object)
      }
// MEMO: Menambahkan Array Of Object ke Key Penilaian Awal Baru
      firstCommentEditPlan.valueChoice = valueProgramActivity
// MEMO: Variabel Akumulasi Rate dan Value Baru
      acumulateRate = helper.triggerAcumulateRateCommentFirstFromAdmin(valueProgramActivity)
// MEMO: Update Komen Pertama
      CommentFirst.findByIdAndUpdate(firstCommentEditPlan._id, {
        userGetComment: firstCommentEditPlan.userGetComment,
        totalRating: acumulateRate.countRate,
        totalValueRating: acumulateRate.countAll,
        typeProgram: firstCommentEditPlan.typeProgram,
        activity: firstCommentEditPlan.activity,
        valueChoice: firstCommentEditPlan.valueChoice,
        dateComment: firstCommentEditPlan.dateComment,
        status: firstCommentEditPlan.status
      }).then((data) => {
// MEMO: Create Komen User
console.log(data)
        Comment.create({
          userGetComment: userGetComment,
          userGiftComment: userGiftComment,
          rating: acumulateRate.countRate,
          originalRate: rating,
          valueRating: acumulateRate.countAll,
          comment: comment,
          dateComment: new Date(),
          status: false,
          typeAssess: typeAssess,
          typeAssessValue: typeAssessValue,
          typeAssessKeyword: typeAssessKeyword,
          typeProgram: typeProgram,
          valueProgramActivity: firstCommentEditPlan.valueChoice,
          activity: activity
        })
        .then((dataCreateCommentSuccess)=>{
// MEMO: Cari Profil User
          User.findById(dataCreateCommentSuccess.userGetComment)
          .then(dataUserGet => {
// MEMO: Variabel Rate Baru
            let newRate = acumulateRate.countRate
// MEMO: Variabel Score Baru
            let newScore = acumulateRate.countAll
// MEMO: Update Rate dan Score User yg Dinilai
            User.findByIdAndUpdate(dataCreateCommentSuccess.userGetComment,{
              rate: newRate,
              score: newScore
            })
            .then((dataUserPost)=>{
		    console.log('inidata userpost',dataUserPost,'inidata userpost')
              res.send(dataUserPost)
            })
            .catch((err)=>{
              res.send(err)
            })
          })
          .catch((err)=>{
            res.send(err)
          })
        })
        .catch((err)=>{
          res.send(err)
        })
      }).catch((err) => {
        res.send(err)
      })
// MEMO: Kondisi Program atau bukan
    } else {
// MEMO: Cari Program yg Dinilai
      Program.findById({
        _id: typeProgram
      })
      .populate({path: 'actvityId.nameActivity'})
      .populate({path: 'actvityId.valueChoice.nameValue', populate: {path: 'keywordsId'}})
      .populate({path: 'actvityId.valueChoice.choiceKeyword'})
      .then((dataProgram)=>{
// MEMO: Variabel Indikator Level
        let hasilReturn = {}
// MEMO: Mencari Data Profil User Yg Mendapat Komen
        User.findById({_id:userGetComment})
        .then((isiGetId =>{
// MEMO: Mencari Data Profil User Yg Memberi Komen
          User.findById({_id:userGiftComment})
          .then((isiGiftId)=>{
// MEMO: Akumulasi Indikator Level
            hasilReturn = helper.triggerIndicatorLevel(isiGetId,isiGiftId)
            // console.log("INDICATOR LEVEL", hasilReturn)
// MEMO: Variabel Mencatat Activity Yg Dinilai
            let activityFromProgram = null
// MEMO: Variabel ...................
            let keyWordFromProgram = []
// MEMO: Variabel ...................
            let valueProgramActivity = []
// MEMO: Variabel Score Impact
            // console.log('KIRIM UNTUK SCORE IMPACT '+dataCommenFirst[0]+' '+rating)
            const rateAcumulate = helper.triggerScoreImpact(dataCommenFirst[0], rating) * hasilReturn
// MEMO: Variabel ...................
            let acumulateRate = {}
// MEMO: Looping Untuk Program Yg Didapat (Keperluan untuk Mencari Activity yg Dipilih Penilai)
            for (let index = 0; index < dataProgram.actvityId.length; index++) {
// MEMO: Pengkondisian Untuk Mendapatkan Activity
              if (dataProgram.actvityId[index].nameActivity._id == activity) {
// MEMO: Simpan Value Activity yg ditemukan
                activityFromProgram = dataProgram.actvityId[index]
              }
            }
// MEMO: Looping Activity yg Telah Disimpan
            for (let index = 0; index < activityFromProgram.valueChoice.length; index++) {
// MEMO: Looping Value Activitynya
              for (let idx = 0; idx < activityFromProgram.valueChoice[index].choiceKeyword.length; idx++) {
// MEMO: Simpan Activity-nya, Kelompokan Berdasarkan Keyword (Jadi Pecahkan Keywordnya)
                keyWordFromProgram.push(activityFromProgram.valueChoice[index].choiceKeyword[idx].keywordName)
              }
            }

// MEMO: Looping Penilaian Awal (Cari Value-nya)
            for (let idx = 0; idx < dataCommenFirst[0].valueChoice.length; idx++) {
// MEMO: Buat Object Value Baru
              let object = {
                nameValue: dataCommenFirst[0].valueChoice[idx].nameValue._id,
                choiceKeyword: []
              }
// MEMO: Looping Penilaian Awal (Cari Keyword-nya)
              for (let index = 0; index < dataCommenFirst[0].valueChoice[idx].choiceKeyword.length; index++) {
// MEMO: Cari apakah Keyword sama dengan keyword yg dipilih
                let indicatorValue = keyWordFromProgram.findIndex(data => {
                  return data == dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].nameKeyword.keywordName
                })
// MEMO: Buat Object Keyword Baru
                let objectForValueKeyword = {
                  nameKeyword: dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].nameKeyword._id,
                  valueKeyword: 0
                }
// MEMO: Cari Score Impact
                var tryToGetScoreImpact = helper.triggerScoreImpactForBeAplus(dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword, rating) * hasilReturn
// MEMO: Conditional -> Jika data ada pada daftar yg dipilih
                if (indicatorValue == -1) {
                  objectForValueKeyword.valueKeyword = dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword
                  object.choiceKeyword.push(objectForValueKeyword)
                } else {
                  objectForValueKeyword.valueKeyword = dataCommenFirst[0].valueChoice[idx].choiceKeyword[index].valueKeyword + tryToGetScoreImpact
                  object.choiceKeyword.push(objectForValueKeyword)
                }
              }
              valueProgramActivity.push(object)
            }
// MEMO: Menambahkan Array Of Object ke Key Penilaian Awal Baru
            firstCommentEditPlan.valueChoice = valueProgramActivity
// MEMO: Variabel Akumulasi Rate dan Value Baru
            acumulateRate = helper.triggerAcumulateRateCommentFirstFromAdmin(valueProgramActivity)
// MEMO: Update Komen Pertama
            CommentFirst.findByIdAndUpdate(firstCommentEditPlan._id, {
              userGetComment: firstCommentEditPlan.userGetComment,
              totalRating: acumulateRate.countRate,
              totalValueRating: acumulateRate.countAll,
              typeProgram: firstCommentEditPlan.typeProgram,
              activity: firstCommentEditPlan.activity,
              valueChoice: firstCommentEditPlan.valueChoice,
              dateComment: firstCommentEditPlan.dateComment,
              status: firstCommentEditPlan.status
            })
            
            .then((data) => {
// MEMO: Create Komen User
              acumulateRate = helper.triggerAcumulateRateCommentFirstFromAdmin(valueProgramActivity)
              Comment.create({
                userGetComment: userGetComment,
                userGiftComment: userGiftComment,
                rating: acumulateRate.countRate,
                originalRate: rating,
                valueRating: acumulateRate.countAll,
                comment: comment,
                dateComment: new Date(),
                status: false,
                typeAssess: typeAssess,
                typeAssessValue: null, // balikin ke asal
                typeAssessKeyword: [], // balikin ke asal
                typeProgram: typeProgram,
                valueProgramActivity: valueProgramActivity,
                activity: activity
              })

              .then((dataCreateCommentSuccess)=>{
// MEMO: Cari Profil User
                User.findById(dataCreateCommentSuccess.userGetComment)

                .then(dataUserGet => {
// MEMO: Variabel Rate Baru
                  let newRate = acumulateRate.countRate
// MEMO: Variabel Score Baru
                  let newScore = acumulateRate.countAll
// MEMO: Update Rate dan Score User yg Dinilai
                  User.findByIdAndUpdate(dataCreateCommentSuccess.userGetComment,{
                    rate: newRate,
                    score: newScore
                  })
                  .then((dataUserPost)=>{
                    console.log('=============================>', dataUserPost)
                    res.send(dataUserPost)
                  }) .catch((err)=>{return res.status(404) })
                }) .catch((err)=>{return res.status(404) })
              }) .catch((err)=>{ res.send(err) })
            }).catch((err) => { res.send(err) })
          }) .catch((err)=>{ res.send(err) })
        })) .catch((err)=>{ res.send(err) })
      }) .catch((err)=>{ res.send(err) })
    }
  }).catch((error) => { res.send(error) })



    setTimeout(() => {
      done(null, 'ok')
    }, 1000)  
  });
}
// DAPATKAN DATA KOMEN BERDASARKAN USER YANG MENGKOMENTARI DAN MERATE
const getDataUserGiftComment = function (req,res) {
  Comment.find({
    userGiftComment: req.body.userGiftComment
  })
  .populate('userGetComment')
  .populate('userGiftComment')
  .populate('typeAssessKeyword')
  .populate('typeProgram')
  .populate('activity')
  .then((data)=>{
    let sortir = []
    for (let index = 0; index < data.length; index++) {
      if (data[index].userGetComment && data[index].userGiftComment) {
        sortir.push(data[index])
      }
    }
    res.send(sortir)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// DAPATKAN DATA KOMEN BERDASARKAN USER YANG MENDAPATKAN KOMEN DAN RATE
const getDataUserGetComment = function (req,res) {
  Comment.find({
    userGetComment: req.body.userGetComment
  })
  .populate('userGetComment')
  .populate('userGiftComment')
  .populate('typeAssessKeyword')
  .populate('typeProgram')
  .populate('activity')
  .then((data)=>{
    let sortir = []
    for (let index = 0; index < data.length; index++) {
      if (data[index].userGetComment && data[index].userGiftComment) {
        sortir.push(data[index])
      }
    }
    res.send(sortir)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// DAPATKAN DATA SEMUA KOMEN DAN RATE DARI SEMUA USER
const getDataAllUserComment = function (req,res) {
  Comment.find({})
  .populate('userGetComment')
  .populate('userGiftComment')
  .populate('typeAssessKeyword')
  .populate('typeProgram', 'nameProgram')
  .populate('activity', 'nameActivity')
  .populate('typeAssessValue')
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// UPDATE KOMEN
const updateComment = function(req,res){
  Comment.findByIdAndUpdate(req.body.id,{
    status: true
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// HAPUS KOMEN
const deleteComment = function (req,res){
  Comment.findByIdAndDelete(req.body.id)
  .then((data)=>{
    res.send("data has been")
  })
  .catch((err)=>{
    res.send(err)
  })
}

module.exports={
  createComment,
  getDataUserGiftComment,
  getDataUserGetComment,
  updateComment,
  deleteComment,
  getDataAllUserComment
}
