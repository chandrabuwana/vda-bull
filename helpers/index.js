const acumulateRateFirst = require('./rateFirstFunction')

const triggerAcumulateRateCommentFirstFromAdmin = (value) => { return acumulateRateFirst.acumulateRateCommentFirstFromAdmin(value)}
const triggerScoreImpact = (commentFirst, rating) => { return acumulateRateFirst.scoreImpact(commentFirst, rating)}
const triggerScoreImpactForBeAplus = (commentFirst, rating) => { return acumulateRateFirst.scoreImpactForBeAplus(commentFirst, rating)}
const triggerAqulumulateRate = (rating) => { return acumulateRateFirst.aqulumulateRate(rating)}
const triggerIndicatorLevel = (getId,giftId)=>{ return acumulateRateFirst.indicatorLevel(getId,giftId)}
module.exports={
    triggerAcumulateRateCommentFirstFromAdmin,
    triggerScoreImpact,
    triggerAqulumulateRate,
    triggerIndicatorLevel,
    triggerScoreImpactForBeAplus
}