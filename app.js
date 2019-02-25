var express = require('express');
var server = express();
require('dotenv').config();
var path=require('path');
var multer=require("multer");
var mongoose = require('mongoose');
var session = require('express-session');
server.use(session({
    secret:'krunal'
}));
var expressValidator = require('express-validator');
server.use(expressValidator());
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mtgari-matgari';
mongoose.promise = global.promise;

mongoose.connect(CONNECTION_URI
  ,{ useNewUrlParser: true }
);

const PORT = process.env.PORT || 8090 ;
server.set('views', path.join(__dirname, 'views'));
server.set("view engine","ejs");
server.set("views","./views");
server.use(express.static(path.join(__dirname, 'public')));
var uploadMid = multer({dest:"./public/imgs"});


var userRouts = require("./controller/user.js");
server.use("/user",userRouts);
server.use("/",userRouts);

var categoryRouts = require("./controller/category.js");
server.use("/category",categoryRouts);

var RoutesubCategory = require('./controller/subCategory');
server.use('/subcategory',RoutesubCategory);

var RouteProduct = require('./controller/product');
server.use('/product',RouteProduct);

var Routeoffer = require('./controller/offer');
server.use('/offer',Routeoffer);

var Routeadmin = require('./controller/admin');
server.use('/admin',Routeadmin);

var AuthRouts = require('./controller/authClient');
server.use('/authClient',AuthRouts);

var AuthRoutsVendor = require('./controller/authVendor');
server.use('/authVendor',AuthRoutsVendor);

var webAuthAdminRouts=require('./controller/webAuthAdmin');
server.use('/authadmin',webAuthAdminRouts);

var webAuthVendorRouts=require('./controller/webAuthvendor');
server.use('/wauthvendor',webAuthVendorRouts);

// server.use(function(req,resp,next){
//     if(!(req.session.status=="admin")){
//         resp.redirect('/authadmin/login');
//     }
//     else{
//       next();
//     }
// });

var webAdminRouts=require('./controller/webadmin');
server.use('/webadmin', webAdminRouts);

var webVendorRouts=require('./controller/webVendor');
server.use('/webvendor', webVendorRouts);

server.listen(PORT,function(){
  console.log('server listen at port number ' + PORT);
});
