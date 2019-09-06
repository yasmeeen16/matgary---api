var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientData = new Schema ({
  _id: { type: Schema.ObjectId, auto: true },
  name:{type: String , require: true},
  email:{type: String , require: true},
  phone:{type: String , require: true},
  password:{type: String , require: true},
  address:{
     country:String ,
     state:String ,
    city:String,
    street_name:String ,
     note:String
  },
  wishList:[{
    productId:{type: Schema.ObjectId,ref:"product",default:null },
    time:{
      type:Date,
      default:Date.now()
    }
  }],
  card:[{
    productId:{type: Schema.ObjectId,ref:"product",default:null },
    time:{
      type:Date,
      default:Date.now()
    },
    quantity:Number,
    status:{type:Number,default:0}
  }],
  time:{
    type:Date,
    default:Date.now()
  }
});
//register model for client
mongoose.model("clientData",clientData);
