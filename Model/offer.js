

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var offer = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  name:{type: String , require: true},
  catsID:[{type: Schema.ObjectId,ref:"Category",default:null }],
  img:String,
  time:{
    type:Date,
    default:Date.now()
  }
});
//register model for client
mongoose.model("offer",offer);
