var express = require('express');
var Router = express.Router();


Router.get('/',function(req,resp,next){

        resp.json({msg:'aaa'});


});



module.exports=Router;
