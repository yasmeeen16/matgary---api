var express = require('express');
var server = express();
require('dotenv').config();
var path=require('path');
var multer=require("multer");
var mongoose = require('mongoose');
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

server.listen(PORT,function(){
  console.log('server listen at port number ' + PORT);
});
