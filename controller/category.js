var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
const fs = require("fs");
var mongoose = require("mongoose");

require("../Model/Category");

var categoryDataModel = mongoose.model("Category");
Router.get('/allCategory',function(req,resp,next){

    categoryDataModel.find({}, function(err, categories) {
                      //resp.render("content/listCat.ejs",{  categories:  categories});
                      resp.json({  categories:  categories});
                  });

});
Router.get('/cat',function(req,resp,next){

        resp.json({msg:'cat'});


});



module.exports=Router;
