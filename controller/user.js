var express = require('express');
var Router = express.Router();


Router.get('/',function(req,resp,next){

        resp.json({msg:'Matgary Api'});


});



module.exports=Router;
