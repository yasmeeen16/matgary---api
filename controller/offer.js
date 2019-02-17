var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});
require("../Model/Category");
require("../Model/product");
require("../Model/subCategory");

var categoryDataModel = mongoose.model("Category");
var productModel = mongoose.model("product");
var subCategoryModel = mongoose.model("subCategory");
//add offer to category

Router.post('/addOfferToCategory/:catId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var Ename = req.body.Ename;
  var Aname = req.body.Aname;
  var img = req.body.img;
  //resp.json({"msg":req.params.catId})
      categoryDataModel.update({_id:req.params.catId},{$set: {"offer": {"Aname": req.body.Ename,"Ename":req.body.Aname
      ,"img":req.file.filename }}},function(err,result){
            if(err){
              resp.json(err);
            }else{
              resp.json({result:"offer added"});
            }

      });
});
//add offer to subCategory
Router.post('/addOfferToSubCategory/:subcatId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var Ename = req.body.Ename;
  var Aname = req.body.Aname;
  var img = req.body.img;
  //resp.json({"msg":req.params.catId})
      subCategoryModel.update({_id:req.params.subcatId},{$set: {"offer": {"Aname": req.body.Ename,"Ename":req.body.Aname
      ,"img":req.file.filename }}},function(err,result){
            if(err){
              resp.json(err);
            }else{
              resp.json({result:"offer added"});
            }

      });
});

//add offer to product
Router.post('/addOfferToProduct/:productId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var Ename = req.body.Ename;
  var Aname = req.body.Aname;
  var img = req.body.img;
  //resp.json({"msg":req.params.catId})
      productModel.update({_id:req.params.productId},{$set: {"offer": {"Aname": req.body.Ename,"Ename":req.body.Aname
      ,"img":req.file.filename }}},function(err,result){
            if(err){
              resp.json(err);
            }else{
              resp.json({result:"offer added"});
            }

      });
});
module.exports=Router;
