var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subCategory = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  catId:{
         type:Schema.ObjectId,
         ref:"Category"
     },
  Aname:String,
  Ename:String,
  img:String,
  offer:{
    Aname:{type:String,default:0},
    Ename:{type:String,default:0},
    img:{type:String,default:0}

  },
  time:{
    type:Date,
    Default:Date.now()
  }
});

mongoose.model("subCategory",subCategory);
