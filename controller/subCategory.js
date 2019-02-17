var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
require("../Model/subCategory");
require("../Model/Category");
const fs =require("fs");
var categoryDataModel = mongoose.model("Category");
var subCategoryModel = mongoose.model("subCategory");

var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});

Router.get('/addsubCategory/:catId',function(req,resp,next){
  //resp.json({msg:"add"});
  //console.log((req.params.catId));
  categoryDataModel.findOne({_id:req.params.catId},function(err,cat){
      //console.log(cat.Ename);
      resp.render("content/addsubcatt.ejs",{cat:cat});
  })

});

Router.post('/addsubCategory/:catId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
console.log((req.params.catId));

  //var categoryId = mongoose.Types.ObjectId(req.param.categoryId);
  //var categoryId = req.body.categoryId;
  //var catId = req.param.catId;
  var Ename = req.body.Ename;
  var Aname = req.body.Aname;
  var img = req.file;
//resp.json(req.file)
  req.checkBody('Ename','english name is empty').notEmpty();
  req.checkBody('Aname','arabic name is empty').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    resp.json(errors);
  }else{
        if(img){

                          ext=img.originalname;
                          ext2=ext.split('.');
                          fs.renameSync(img.path,img.destination+"/"+img.filename+'.'+ext2[1] );
                          img = img.filename+'.'+ext2[1];
                          console.log(img);
                          subCategoryModel.find({Ename:req.body.Ename }, function(err, category) {
                                                if(err){
                                                  resp.json(err);
                                                }else if(category.length > 0){
                                                  resp.json({ msg : "duplicate category" });
                                                }else{
                                                  var mysubCategory = new subCategoryModel({
                                                    catId:req.params.catId,
                                                    Ename: req.body.Ename,
                                                    Aname: req.body.Aname,
                                                    img:img,
                                                    time:new Date()
                                                  });
                                                  mysubCategory.save(function(err,doc){
                                                    if(err){
                                                      resp.json(err);
                                                  }else{
                                                      console.log("saved")
                                                      resp.json(doc);
                                                  }
                                                  });

                                                }

                                              });
        }else{
          resp.json({msg:"upload your img"})
        }
      }
//console.log(parseInt(req.param.catId));
});

Router.get('/all_subCategory/:catId',function(req,resp,next){

 //console.log(catId);
    subCategoryModel.find({catId:req.params.catId}, function(err, subcategories) {
                    resp.json({  subcategories: subcategories});
                    //resp.render("content/subcat.ejs",{subcategories: subcategories});
                  });

});

Router.get('/all_subCategory',function(req,resp,next){

 //console.log(catId);
    subCategoryModel.find({}, function(err, subcategories) {
                    resp.json({  subcategories: subcategories});
                    //resp.render("content/subcat.ejs",{subcategories: subcategories});
                  });

});




module.exports=Router;
