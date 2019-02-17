var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var admin = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  name:{type: String , require: true},
  email:{type: String , require: true},
  phone:{type: String , require: true},
  password:{type: String , require: true},
  time:{
    type:Date,
    default:Date.now()
  }
});
//register model for client
mongoose.model("admin",admin);
