var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
const path = require('path');
const fs = require("fs");
var mongoose = require("mongoose");

var multer = require("multer");
require("../Model/Category");
require("../Model/offer");
require("../Model/vendorData")
var categoryDataModel = mongoose.model("Category");
var   subCategoryModel= mongoose.model("subCategory");
var vendorDataModel=mongoose.model("vendorData");
require("../Model/product");
var productModel = mongoose.model("product");

var offerModel = mongoose.model("offer");

var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});



Router.get('/addproductToCat',function(req,resp,next){
  //resp.json({msg:"add"});
  //console.log((req.params.catId));
  offerModel.find({},function(err,offers){
  categoryDataModel.find({},function(err,cat){
      //console.log(cat.Ename);
      resp.render("content/addproducttocategory.ejs",{cat:cat,offers:offers});
  });
});
});
//add product to category
Router.post("/addproductToCat",uploadMid.any(),function(req,resp){

    //var contact = req.body.contact;
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
        // }
        //else{

        var productimg = [];
          if (req.files.length > 0){
            for(var i=0 ; i < req.files.length ; i++ ){
              ext=req.files[i].originalname;
              ext2=ext.split('.');
              fs.renameSync(req.files[i].path,req.files[i].destination+"/"+req.files[i].filename+'.'+ext2[1] );
              productimg.push(req.files[i].filename+'.'+ext2[1]);

            }//end for
          }// end if

           productModel.find({Aname:req.body.Aname , Ename:req.body.Ename}, function(err, products) {
                            //resp.json({   omraTrips: omraTrips});
                            if(products.length > 0){
                              resp.redirect("/webadmin/addproductToCat");
                              //resp.json({ msg : "duplicate omra trip" });
                            }else{
                              var product = new productModel({
                                Ename:req.body.Ename,
                                Aname:req.body.Aname,
                                modelnumber:req.body.modelnumber,
                                brandArabic:req.body.brandArabic,
                                brandEnglish:req.body.brandEnglish,
                                price1:req.body.price1,
                                price2:req.body.price2,
                                imgs:productimg,
                                catId:req.body.catId,
                                offerId:req.body.offerId,
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
                                        //resp.redirect("/webadmin/addproductToCat/"+req.params.catId);
                                        console.log(err);
                                        return;
                                      }else
                                      //resp.redirect('/webadmin/listAllCategories');
                                      resp.json({  product :  product});

                                    });//save the object
                            }
                        });


});
module.exports=Router;
