var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  Ename:String,
  Aname:String,
  img:String,
  offer:{
    Aname:{type:String,default:0},
    Ename:{type:String,default:0},
    img:{type:String,default:0}

  },
  offerID:[{type: Schema.ObjectId,ref:"offer",default:null }],
  productsID:[{type: Schema.ObjectId,ref:"product",default:null }],
  parent:{ type: Schema.ObjectId,ref:"Category",default:null },
  mainParent:{ type: Schema.ObjectId,ref:"Category",default:null },
  time:{
    type:Date,
    Default:Date.now()
  }
});

mongoose.model("Category",Category);
