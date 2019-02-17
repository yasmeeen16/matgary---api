var express = require('express');
var Router = express.Router();


Router.get('/cat',function(req,resp,next){

        resp.json({msg:'cat'});


});



module.exports=Router;
