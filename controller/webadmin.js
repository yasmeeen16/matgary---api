var express = require('express');
var server = express();
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
require("../Model/vendorData");
require("../Model/admin");
var categoryDataModel = mongoose.model("Category");
var   subCategoryModel= mongoose.model("subCategory");
var vendorDataModel=mongoose.model("vendorData");
var adminModel=mongoose.model("admin");
require("../Model/product");
var productModel = mongoose.model("product");

var offerModel = mongoose.model("offer");

var multer = require("multer");//to upload file
var uploadMid = multer({dest:"./public/imgs"});
// server.use(function(req,resp,next){
//     if(!(req.session.status=="admin")){
//         resp.redirect('/authadmin/login');
//     }
//     else{
//       next();
//     }
// });
// ////////////////////////////////////
Router.get('/home',function(req,resp,next){

  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {


    categoryDataModel.find({parent:null},{_id:1,Aname:1,Ename:1,img:1,time:1}, function(err, cats) {
      //resp.render("content/listCat.ejs",{  categories:  categories});
      resp.render('content/home.ejs',{data:cats});
  });
}
});


Router.get('/addCategory',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else{
  categoryDataModel.find({},{_id:1,Aname:1,Ename:1,img:1,time:1}, function(err, cats) {
  resp.render("content/addCategory.ejs",{data:cats});
  });
}
});

Router.post('/addCategory',BodyParserMid,function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else{
//   var Ename = req.body.Ename;
//   var Aname = req.body.Aname;
  // var img = req.file;
   var parent;
   if(req.body.parent=="0"){parent=null;}else{
     parent=req.body.parent;
   }
// //resp.json(req.file)
  // if(!img){
  //   resp.redirect("/webadmin/addCategory");
  //   //resp.json({msg:"upload your img "})
  // }else{
  req.checkBody('Ename','english name is empty').notEmpty();
  req.checkBody('Aname','arabic name is empty').notEmpty();
  req.checkBody('url','image is empty').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    //resp.json(errors);
    resp.redirect("/webadmin/addCategory");
  }else{


                // ext=img.originalname;
                // ext2=ext.split('.');
                // console.log(img.path);
                // console.log(img.destination);
                // fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
                // console.log(img.path);
                // img = req.file.filename+'.'+ext2[1];
                // console.log(img);

      categoryDataModel.find({Ename:req.body.Ename ,Aname:req.body.Aname}, function(err, category) {
                            if(category.length > 0){
                              //resp.json({ msg : "duplicate category" });
                              resp.redirect("/webadmin/addCategory");
                            }else{
                              var myCategory = new categoryDataModel({
                                Ename:req.body.Ename,
                                Aname: req.body.Aname,
                                img:req.body.url,
                                parent:parent,
                                time:new Date()
                              });
                              myCategory.save(function(err,doc){
                                if(err){
                                  resp.redirect("/webadmin/addCategory");
                                  //resp.json(err);
                              }else{
                                  console.log("saved")
                                  resp.redirect("/webadmin/home");
                              }
                              });
                            }
                          });
                  }
  //              }
}
});

Router.get('/offers',function(req,resp,next){
  //resp.json({msg:"add"});
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {

    offerModel.find({}, function(err, offers) {
      resp.render("content/offer.ejs",{offers:offers});
    });
}
});
Router.get('/addOffer',function(req,resp,next){
  //resp.json({msg:"add"});
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {


  resp.render("content/addoffer.ejs");
}
});
Router.post('/addOffer',BodyParserMid,function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {


//resp.json(req.body);
//   var Ename = req.body.Ename;
//   var Aname = req.body.Aname;
//   var img = req.file;
// //resp.json(req.file)
  // if(!img){
  //   resp.redirect("/webadmin/addOffer");
  //   //resp.json({msg:"upload your img "})
  // }else{
  req.checkBody('name','english name is empty').notEmpty();
  req.checkBody('url','image  is empty').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    //resp.json(errors);
    resp.redirect("/webadmin/addOffer");
  }else{


                // ext=img.originalname;
                // ext2=ext.split('.');
                // console.log(img.path);
                // console.log(img.destination);
                // fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
                // console.log(img.path);
                // img = req.file.filename+'.'+ext2[1];
                // console.log(img);

      offerModel.find({name:req.body.name}, function(err, offer) {
                            if(offer.length > 0){
                              //resp.json({ msg : "duplicate offer" });
                              resp.redirect("/webadmin/addOffer");
                            }else{
                              var myOffer = new offerModel({
                                name:req.body.name,
                                img:req.body.url,
                                time:new Date()
                              });
                              myOffer.save(function(err,doc){
                                if(err){
                                  resp.redirect("/webadmin/addOffer");
                                  //resp.json(err);
                              }else{
                                  console.log("saved")
                                  resp.redirect("/webadmin/offers");
                                  //resp.json(doc);
                              }
                              });
                            }
                          });
                  }
  //              }
}
});


Router.get('/deleteoffer/:id',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else{
  offerModel.remove({_id:req.params.id}, function(err, vendors) {
    resp.redirect("/webadmin/offers");
  });
}
});
Router.get('/editoffer/:id',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {


  offerModel.findOne({_id:req.params.id}, function(err, offer) {
    resp.render("content/editoffer.ejs",{offer:offer});
  });
}
});
Router.post('/editOffer/:id',uploadMid.single('img'),function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else{
  // var img = req.file;
  //
  //              ext=img.originalname;
  //              ext2=ext.split('.');
  //              console.log(img.path);
  //              console.log(img.destination);
  //              fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
  //              console.log(img.path);
  //              img = req.file.filename+'.'+ext2[1];
  //              console.log(img);

  offerModel.update({_id:req.params.id},{name:req.body.name,img:req.body.url}, function(err, offer) {
    resp.redirect("/webadmin/offers");
  });

}
});


Router.get('/vendors',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {

  //resp.json({msg:"add"});
    vendorDataModel.find({}, function(err, vendors) {
      resp.render("content/vendordata.ejs",{vendors:vendors});
    });
}
});
Router.get('/activevendors/:id',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {

    vendorDataModel.update({_id:req.params.id},{Status:1}, function(err, vendors) {
      resp.redirect("/webadmin/vendors");
    });
}
});
Router.get('/unactivevendors/:id',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {

  vendorDataModel.update({_id:req.params.id},{Status:0}, function(err, vendors) {
    resp.redirect("/webadmin/vendors");
  });
}
});

Router.get('/allproducts',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else {

    productModel.find({}, function(err, products) {
                    //resp.json({  products: products});
                      resp.render("content/table.ejs",{products:products});
                  });
                }
});

 var categoryModel = mongoose.model("Category");
// Router.get('/',function(req,resp,next){
//
//   categoryModel.find({}, function(err, categories) {
//     //console.log(categories[0].img);
//     resp.render("content/cat.ejs",{  categories:  categories});
//                     //resp.render("content/listCat.ejs",{  categories:  categories});
//                     //resp.json({  categories:  categories});
//                 });
//
//
// });
// //list all ctegories
// Router.get('/listAllCategories',function(req,resp,next){
//
//   categoryModel.find({}, function(err, categories) {
//     //console.log(categories[0].img);
//     resp.render("content/cat.ejs",{  categories:  categories});
//                     //resp.render("content/listCat.ejs",{  categories:  categories});
//                     //resp.json({  categories:  categories});
//                 });
//
//
// });
//

// /////////////////////////////////My Project////////////////////////////////////////
Router.get('/editCategory/:catId',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else{
  categoryDataModel.find({},{_id:1,Aname:1,Ename:1,img:1,time:1}, function(err, cats) {


  categoryModel.findOne({_id:req.params.catId}, function(err, category) {
    //console.log(categories[0].img);
    resp.render("content/editcat.ejs",{data:cats,category:category});

                });
              });
}
});
Router.get('/deleteCategory/:id',function(req,resp,next){
  if(!(req.session.status=="admin")){
      resp.redirect('/authadmin/login');
  }else{
  categoryModel.remove({_id:req.params.id}, function(err, vendors) {
    resp.redirect("/webadmin/home");
  });
}
});

  Router.post('/editCategory/:catId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
    if(!(req.session.status=="admin")){
        resp.redirect('/authadmin/login');
    }else {

    //resp.json(req.file);
    //   var Ename = req.body.Ename;
    //   var Aname = req.body.Aname;
       // var img = req.file;
       var parent;
       if(req.body.parent=="0"){parent=null;}else{
         parent=req.body.parent;
       }
    // //resp.json(req.file)
      // if(!img){
      //   resp.redirect("/webadmin/home");
      //   //resp.json({msg:"upload your img "})
      // }else{
      req.checkBody('Ename','english name is empty').notEmpty();
      req.checkBody('Aname','arabic name is empty').notEmpty();
      req.checkBody('url','your image is empty').notEmpty();
      let errors = req.validationErrors();
      if(errors){
        //resp.json(errors);
        resp.redirect("/webadmin/home");
      }else{


                    // ext=img.originalname;
                    // ext2=ext.split('.');
                    // console.log(img.path);
                    // console.log(img.destination);
                    // fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
                    // console.log(img.path);
                    // img = req.file.filename+'.'+ext2[1];
                    // console.log(img);

          categoryDataModel.update({_id:req.params.catId},{Aname:req.body.Aname,Ename:req.body.Ename,img:req.body.url, parent: parent}, function(err, category) {
                    resp.redirect("/webadmin/home");
                              });
                      }
                  //  }
                }
    });

// //all sub categories bage
// Router.get('/ListOfsubCategory',function(req,resp,next){
//
//  //console.log(catId);
//  categoryDataModel.find({},function(err, categories) {
//     subCategoryModel.find({}, function(err, subcategories) {
//
//                     resp.render("content/subcat.ejs",{categories:categories,subcategories: subcategories});
//                   });
// })
// });
//
// // bage sub categories for spacific category.....
// Router.get('/allsubCategory/:catId',function(req,resp,next){
//
//  //console.log(catId);
//  categoryDataModel.find({},function(err, categories) {
//     subCategoryModel.find({catId:req.params.catId}, function(err, subcategories) {
//                     //resp.json({  subcategories: subcategories});
//                     resp.render("content/subcat2.ejs",{subcategories: subcategories,categories:categories});
//                   });
//                 })
//
// });
// //list all products

// ///add sub categoryId
// Router.post('/addsubCategory',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
// //console.log((req.params.catId));
//
//   //var categoryId = mongoose.Types.ObjectId(req.param.categoryId);
//   //var categoryId = req.body.categoryId;
//   //var catId = req.param.catId;
//   var Ename = req.body.Ename;
//   var Aname = req.body.Aname;
//   var catId = req.body.catId;
//   var img = req.file;
// //resp.json(req.file)
//   req.checkBody('Ename','english name is empty').notEmpty();
//   req.checkBody('Aname','arabic name is empty').notEmpty();
//
//   let errors = req.validationErrors();
//   if(errors){
//     //resp.json(errors);
//     resp.redirect("/webadmin/addsubCategory");
//   }else{
//         if(img){
//                           ext=img.originalname;
//                           ext2=ext.split('.');
//                           console.log(img.path);
//                           console.log(img.destination);
//                           fs.renameSync(req.file.path,path.join(req.file.destination,req.file.filename+"."+ext2[1]  ));
//                           console.log(img.path);
//                           img = req.file.filename+'.'+ext2[1];
//                           console.log(img);
//
//                           subCategoryModel.find({Ename:req.body.Ename }, function(err, category) {
//                                                 if(err){
//                                                   resp.json(err);
//                                                 }else if(category.length > 0){
//                                                   //resp.json({ msg : "duplicate category" });
//                                                   resp.redirect("/webadmin/addsubCategory");
//                                                 }else{
//                                                   var mysubCategory = new subCategoryModel({
//                                                     catId:req.body.catId,
//                                                     Ename: req.body.Ename,
//                                                     Aname: req.body.Aname,
//                                                     img:img,
//                                                     time:new Date()
//                                                   });
//                                                   mysubCategory.save(function(err,doc){
//                                                     if(err){
//                                                       resp.redirect("/webadmin/addsubCategory");
//                                                       //resp.json(err);
//                                                   }else{
//                                                       console.log("saved")
//                                                       //resp.json(doc);
//                                                       resp.redirect("/webadmin/ListOfsubCategory");
//                                                   }
//                                                   });
//
//                                                 }
//
//                                               });
//         }else{
//           //resp.json({msg:"upload your img"})
//           resp.redirect("/webadmin/addsubCategory");
//         }
//       }
// //console.log(parseInt(req.param.catId));
// });
//
// //list all ctegories
// Router.get('/addSubCategory',function(req,resp,next){
//
//   categoryModel.find({}, function(err, categories) {
//     //console.log(categories[0].img);
//     resp.render("content/addsubcat.ejs",{  categories:  categories});
//                     //resp.render("content/listCat.ejs",{  categories:  categories});
//                     //resp.json({  categories:  categories});
//                 });
//
//
// });
//
// //get add subcat to cat
// Router.get('/addSubCategorytoCat/:catId',function(req,resp,next){
//   //resp.json({msg:"add"});
//   //console.log((req.params.catId));
//   categoryDataModel.findOne({_id:req.params.catId},function(err,cat){
//       //console.log(cat.Ename);
//       resp.render("content/addsubcat2.ejs",{cat:cat});
//   })
//
// });
//
// //post add subcat to cat
// Router.post('/addsubCategory/:catId',[BodyParserMid,uploadMid.single('img')],function(req,resp,next){
// console.log((req.params.catId));
//
//   //var categoryId = mongoose.Types.ObjectId(req.param.categoryId);
//   //var categoryId = req.body.categoryId;
//   //var catId = req.param.catId;
//   var Ename = req.body.Ename;
//   var Aname = req.body.Aname;
//   var img = req.file;
// //resp.json(req.file)
//   req.checkBody('Ename','english name is empty').notEmpty();
//   req.checkBody('Aname','arabic name is empty').notEmpty();
//
//   let errors = req.validationErrors();
//   if(errors){
//     resp.redirect("/webadmin/addSubCategorytoCat/"+req.params.catId);
//     //resp.json(errors);
//   }else{
//         if(img){
//
//                           ext=img.originalname;
//                           ext2=ext.split('.');
//                           fs.renameSync(img.path,img.destination+"/"+img.filename+'.'+ext2[1] );
//                           img = img.filename+'.'+ext2[1];
//                           console.log(img);
//                           subCategoryModel.find({Ename:req.body.Ename }, function(err, category) {
//                                                 if(err){
//                                                   resp.redirect("/webadmin/addSubCategorytoCat/"+req.params.catId);
//                                                   //resp.json(err);
//                                                 }else if(category.length > 0){
//                                                   resp.redirect("/webadmin/addSubCategorytoCat/"+req.params.catId);
//                                                   //resp.json({ msg : "duplicate category" });
//                                                 }else{
//                                                   var mysubCategory = new subCategoryModel({
//                                                     catId:req.params.catId,
//                                                     Ename: req.body.Ename,
//                                                     Aname: req.body.Aname,
//                                                     img:img,
//                                                     time:new Date()
//                                                   });
//                                                   mysubCategory.save(function(err,doc){
//                                                     if(err){
//                                                       resp.redirect("/webadmin/addSubCategorytoCat/"+req.params.catId);
//                                                       //resp.json(err);
//                                                   }else{
//                                                       console.log("saved")
//                                                       //resp.json(doc);
//                                                       resp.redirect("/webadmin/allsubCategory/"+req.params.catId);
//                                                   }
//                                                   });
//
//                                                 }
//
//                                               });
//         }else{
//           //resp.json({msg:"upload your img"})
//           resp.redirect("/webadmin/addSubCategorytoCat/"+req.params.catId);
//         }
//       }
// //console.log(parseInt(req.param.catId));
// });
Router.get('/addproductToCat/:catId',function(req,resp,next){
  //resp.json({msg:"add"});
  //console.log((req.params.catId));
  categoryDataModel.findOne({_id:req.params.catId},function(err,cat){
      //console.log(cat.Ename);
      resp.render("content/addproducttocategory.ejs",{cat:cat});
  })

});
//add product to category
Router.post("/addproductToCat/:catId",uploadMid.any(),function(req,resp){

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
                              resp.redirect("/webadmin/addproductToCat/"+req.params.catId);
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
                                        resp.redirect("/webadmin/addproductToCat/"+req.params.catId);
                                        //console.log(err);
                                        return;
                                      }else
                                      resp.redirect('/webadmin/listAllCategories');
                                      //resp.json({  product :  product});

                                    });//save the object
                            }
                        });


});
Router.get('/admins',function(req,resp,next){
  adminModel.find({},function(err,admins){
    resp.render("content/myadmins.ejs",{admins,admins});

  })


});
Router.get('/getstart',function(req,resp,next){
  resp.json({msg:"start"});
    // vendorDataModel.find({}, function(err, vendors) {
    //   resp.render("content/vendordata.ejs",{vendors:vendors});
    // });

});
Router.get('/logout',function(req,resp,next){
  req.session.destroy(function(){
    resp.redirect('/authadmin/login');
  });

});
module.exports=Router;
