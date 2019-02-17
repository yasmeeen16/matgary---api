var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
const fs=require("fs");
var mongoose = require("mongoose");
require("../Model/product");
require("../Model/subCategory");


var productModel = mongoose.model("product");
var subCategoryModel = mongoose.model("subCategory");

var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});


Router.get('/addProduct/:subcatId',function(req,resp,next){
        //console.log(req.params.subcatId);
        subCategoryModel.findOne({_id:req.params.subcatId }, function(err, category) {
            //resp.json({category:category});
            resp.render("content/addproduct.ejs",{category:category});
        })
});


//add produc to sub category
Router.post("/addProduct/:subcatId",uploadMid.any(),function(req,resp){
  //resp.json(req.body);
  console.log(req.params.subcatId);
    var name = req.body.name;
    var desc = req.body.desc;
    var price = req.body.price;
    var hotelName = req.body.hotelName;
    //var contact = req.body.contact;
    var imgs = [];
    var hotelImages = [];

        // req.checkBody('name','name is empty').notEmpty();
        // req.checkBody('desc','description is empty').notEmpty();
        // req.checkBody('price','price is empty').notEmpty();
        // req.checkBody('hotelName','hotel name is empty').notEmpty();
        // let errors = req.validationErrors();
        // if(errors){
        //   resp.redirect('/umrah/addUmrah');
        //   // return resp.status(409).json({
        //   //   message:"enter your data"
        //   // });
        // }else{

        var productimg = [];
          if (req.files.length > 0){
            for(var i=0 ; i < req.files.length ; i++ ){



              ext=req.files[i].originalname;
              ext2=ext.split('.');
              fs.renameSync(req.files[i].path,req.files[i].destination+"/"+req.files[i].filename+'.'+ext2[1] );
              productimg.push(req.files[i].filename+'.'+ext2[1])


            }//end for
          }// end if
          // umrahModel.find({name:req.body.name ,desc:req.body.desc,price:req.body.price,hotelName: req.body.hotelName,
          //   contact:req.body.contact}, function(err, omraTrips) {
          //                   //resp.json({   omraTrips: omraTrips});
          //                   if(omraTrips.length > 0){
          //                     resp.redirect('/umrah/addUmrah');
          //                     //resp.json({ msg : "duplicate omra trip" });
          //                   }else{
                              var product = new productModel({
                                Ename:req.body.Ename,
                                Aname:req.body.Aname,
                                modelnumber:req.body.modelnumber,
                                brandArabic:req.body.brandArabic,
                                brandEnglish:req.body.brandEnglish,
                                price1:req.body.price1,
                                price2:req.body.price2,
                                imgs:productimg,
                                subcatId:req.params.subcatId,
                                discount:req.body.discount,
                                discriptionEnglish:req.body.discriptionEnglish,
                                discriptionArabic:req.body.discriptionArabic,
                                tagsArabic:req.body.tagsArabic,
                                tagsEnglish:req.body.tagsEnglish,
                                freeshipping:req.body.freeshipping,
                                heighlightEnglish:req.body.heighlightEnglish,
                                heighlightArabic:req.body.heighlightArabic,
                                specificationEnglish:req.body.specificationEnglish,
                                specificationArabic:req.body.specificationArabic,
                                quantity:req.body.quantity,
                                status:req.body.status,
                                time:Date.now()
                              });//object of product
                              product.save(function(err) {
                                    if(err){
                                        console.log(err);
                                        return;
                                      }else
                                      //resp.redirect('//');
                                      resp.json({  product :  product});

                                    });//save the object
                          //  }
                        //});
        //}

});
//add produc to category
Router.post("/addProduct2/:catId",uploadMid.any(),function(req,resp){
  //resp.json(req.body);
  console.log(req.params.catId);
    var imgs = [];

        // req.checkBody('name','name is empty').notEmpty();
        // req.checkBody('desc','description is empty').notEmpty();
        // req.checkBody('price','price is empty').notEmpty();
        // req.checkBody('hotelName','hotel name is empty').notEmpty();
        // let errors = req.validationErrors();
        // if(errors){
        //   resp.redirect('/umrah/addUmrah');
        //   // return resp.status(409).json({
        //   //   message:"enter your data"
        //   // });
        // }else{
          if (req.files.length > 0){
            for(var i=0 ; i < req.files.length ; i++ ){
              if(req.files[i].fieldname === "imgs"){
                imgs.push(req.files[i].filename);
              }
            }//end for
          }// end if
          // umrahModel.find({name:req.body.name ,desc:req.body.desc,price:req.body.price,hotelName: req.body.hotelName,
          //   contact:req.body.contact}, function(err, omraTrips) {
          //                   //resp.json({   omraTrips: omraTrips});
          //                   if(omraTrips.length > 0){
          //                     resp.redirect('/umrah/addUmrah');
          //                     //resp.json({ msg : "duplicate omra trip" });
          //                   }else{
                              var product = new productModel({
                                Ename:req.body.Ename,
                                Aname:req.body.Aname,
                                modelnumber:req.body.modelnumber,
                                brandArabic:req.body.brandArabic,
                                brandEnglish:req.body.brandEnglish,
                                imgs:imgs,
                                catId:req.params.catId,
                                discount:req.body.discount,
                                discriptionEnglish:req.body.discriptionEnglish,
                                discriptionArabic:req.body.discriptionArabic,
                                tagsArabic:req.body.tagsArabic,
                                tagsEnglish:req.body.tagsEnglish,
                                freeshipping:req.body.freeshipping,
                                heighlightEnglish:req.body.heighlightEnglish,
                                heighlightArabic:req.body.heighlightArabic,
                                specificationEnglish:req.body.specificationEnglish,
                                specificationArabic:req.body.specificationArabic,
                                quantity:req.body.quantity,
                                status:req.body.status,
                                time:Date.now()
                              });//object of product
                              product.save(function(err) {
                                    if(err){
                                        console.log(err);
                                        return;
                                      }else
                                      //resp.redirect('//');
                                      resp.json({  product :  product});

                                    });//save the object
                          //  }
                        //});
        //}

});

Router.get('/allproductsOfCategory/:catId',function(req,resp,next){

 //console.log(catId);
    productModel.find({catId:req.params.catId}, function(err, products) {
                    resp.json({  products: products});
                      //resp.render("content/listSubCat.ejs",{subcategories: subcategories});
                  });

});

Router.get('/allproductsOfSubCategory/:subcatId',function(req,resp,next){

 //console.log(catId);
    productModel.find({subcatId:req.params.subcatId}, function(err, products) {
                    resp.json({ products: products});
                      //resp.render("content/listSubCat.ejs",{subcategories: subcategories});
                  });

});
//add review to product
Router.post('/addreviewtoproduct',BodyParserMid,function(req,resp){
    // console.log(req.query.pId);
    // console.log(req.query.cId);
//resp.json(req.body)
      productModel.update({_id: req.query.pId},{$addToSet: {"reviews": {"userId":req.query.cId,"title":req.body.title,"desc":req.body.desc}}},function(err,result){
            if(err){
              resp.json(err);
            }else{
              resp.json({result:"add review success"});
            }

      });
});
//remove review from product
Router.get('/removefromcard',function(req,resp){
    // console.log(req.query.pId);
    // console.log(req.query.cId);

      productModel.update({_id:req.query.pId},{$pull: {"reviews": {"userId":req.query.cId}}},function(err,result){
            if(err){
              resp.json(err);
            }else{
              resp.json({result:"remove from card success"});
            }

      });
});

module.exports=Router;
