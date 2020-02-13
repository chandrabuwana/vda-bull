const mongoose = require('mongoose');
var cors = require('cors')
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const express =  require('express');
const app = express();
const port = 3003||8080;
const bodyParser = require('body-parser');
var kue = require('kue')
  , jobs = kue.createQueue();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const url ='mongodb://vda:vdaasmin1@ds135335.mlab.com:35335/vda'

// MongoClient.connect(url,function(err,client){
//   assert.equal(null,err)
//   console.log('database has been run')
//   client.close;
// })
mongoose.connect(url,{ useNewUrlParser: true });
const user = require('./routes/user.route')
const comment = require('./routes/comment.route')
const rating = require('./routes/rating.route')
const division = require('./routes/division.route')
const program = require('./routes/program.route')
const activity = require('./routes/activity.route')
const keyword = require('./routes/keyword.route')
const value = require('./routes/value.route')
const graphic = require('./routes/graphic.route')




// kue.app.listen(3003);
app.use('/api/user', user)
app.use('/api/comment', comment)
app.use('/api/rating', rating)
app.use('/api/division',division)
app.use('/api/program',program)
app.use('/api/activity',activity)
app.use('/api/keyword',keyword)
app.use('/api/value',value)
app.use('/api/graphic',graphic)
app.use("/kue-ui", kue.app);
app.get('/',function(req,res){
  console.log('run run run')
  res.send('run run run')
})
app.listen(
  port,()=>console.log('jalan di 3003'))
module.exports=app
