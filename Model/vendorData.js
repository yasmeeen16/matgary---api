var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendorData = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  name:String,
  password:String,
  img:String,
  address:String,
  email:String,
  phone:String,
  Status:{type:Number,default:0},
  time:{
    type:Date,
    Default:Date.now()
  }
});
//register model for client
mongoose.model("vendorData",vendorData);
