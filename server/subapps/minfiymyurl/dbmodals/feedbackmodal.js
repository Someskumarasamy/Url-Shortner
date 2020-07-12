const mongoose = require('mongoose');
const schema = mongoose.Schema;


const sch_user = new schema({
    email:{type:String,required:true},
    name:{type:String,required:true,maxlength:256},
    comment:{type:String,required:true},
    date:{type:Date, default:Date.now()}
});
module.exports = mongoose.model('minurl_UsrFeedback', sch_user);