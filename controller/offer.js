var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
var mongoose = require("mongoose");
var multer = require("multer");//to upload file
var fs = require("fs");
var uploadMid = multer({dest:"./public/imgs"});
require("../Model/Category");
require("../Model/product");
require("../Model/subCategory");
require("../Model/offer");
var categoryDataModel = mongoose.model("Category");
var productModel = mongoose.model("product");
var subCategoryModel = mongoose.model("subCategory");
var offerModel=mongoose.model("offer");
//add offer to category

Router.post('/addOfferToCategory/:catId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

  var Ename = req.body.Ename;
  var Aname = req.body.Aname;
  var img = req.file;
  ext=img.originalname;
  ext2=ext.split('.');
  console.log(img.path);
  console.log(img.destination);
  // // console.log(img.destination+"/"+img.filename+'.'+ext2[1]);
  // // var NewPath = img.destination+"/"+img.filename+'.'+ext2[1];
  fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
  console.log(img.path);
  // resp.json(req.file);
  img = req.file.filename+'.'+ext2[1];
  console.log(img);
  //resp.json({"msg":req.params.catId})
      categoryDataModel.updateOne({_id:req.params.catId},{$set: {"offer": {"Aname": req.body.Ename,"Ename":req.body.Aname
      ,"img":img }}},function(err,result){
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
      subCategoryModel.updateOne({_id:req.params.subcatId},{$set: {"offer": {"Aname": req.body.Ename,"Ename":req.body.Aname
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
  var img = req.file;
  ext=img.originalname;
  ext2=ext.split('.');
  console.log(img.path);
  console.log(img.destination);
  // // console.log(img.destination+"/"+img.filename+'.'+ext2[1]);
  // // var NewPath = img.destination+"/"+img.filename+'.'+ext2[1];
  fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
  console.log(img.path);
  // resp.json(req.file);
  img = req.file.filename+'.'+ext2[1];
  console.log(img);
  //resp.json({"msg":req.params.catId})
      productModel.updateOne({_id:req.params.productId},{$set: {"offer": {"Aname": req.body.Ename,"Ename":req.body.Aname
      ,"img":img}}},function(err,result){
            if(err){
              resp.json(err);
            }else{
              resp.json({result:"offer added"});
            }

      });
});


Router.post('/addOffer',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){

//   var Ename = req.body.Ename;
//   var Aname = req.body.Aname;
   var img = req.file;
// //resp.json(req.file)
  if(!img){
    //resp.redirect("/webadmin/addOffer");
    resp.json({msg:"upload your img "})
  }else{
  req.checkBody('name','english name is empty').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    resp.json(errors);
    //resp.redirect("/webadmin/addOffer");
  }else{


                ext=img.originalname;
                ext2=ext.split('.');
                console.log(img.path);
                console.log(img.destination);
                fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
                console.log(img.path);
                img = req.file.filename+'.'+ext2[1];
                console.log(img);

      offerModel.find({name:req.body.name}, function(err, offer) {
                            if(offer.length > 0){
                              resp.json({ msg : "duplicate category" });
                              //resp.redirect("/webadmin/addOffer");
                            }else{
                              var myOffer = new offerModel({
                                name:req.body.name,
                                img:img,
                                time:new Date()
                              });
                              myOffer.save(function(err,doc){
                                if(err){
                                  //resp.redirect("/webadmin/addOffer");
                                  resp.json(err);
                              }else{
                                  console.log("saved")
                                  //resp.redirect("/webadmin/offers");
                                  resp.json(doc);
                              }
                              });
                            }
                          });
                  }
                }
});

Router.get('/offers',function(req,resp,next){
  //resp.json({msg:"add"});
    offerModel.find({}, function(err, offers) {
      resp.json({offers:offers});
    });

});
module.exports=Router;
