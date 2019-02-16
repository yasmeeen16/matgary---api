var express = require('express');
var server = express();
require('dotenv').config();
var path=require('path');
var mongoose = require('mongoose');

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourism';
mongoose.promise = global.promise;

mongoose.connect(CONNECTION_URI
  ,{ useNewUrlParser: true }
);

const PORT = process.env.PORT || 8090 ;
server.set('views', path.join(__dirname, 'views'));
server.set("view engine","ejs");
server.set("views","./views");
server.use(express.static(path.join(__dirname, 'public')));


var userRouts = require("./controllers/user.js");
server.use("/user",userRouts);
server.use("/",userRouts);

server.listen(PORT,function(){
  console.log('server listen at port number ' + PORT);
});
