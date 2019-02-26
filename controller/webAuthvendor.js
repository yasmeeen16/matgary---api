var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');//for generate hashed password and verifiy
const path = require('path');
require('../Model/vendorData');
var vendorModel = mongoose.model("vendorData");



Router.get('/login',function(req,resp){
  resp.render("content/login-vendor.ejs");

});

Router.post('/login',BodyParserMid,function(req,resp){
        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('email','email is empty').notEmpty();
        req.checkBody('email','email is not email').isEmail();
        req.checkBody('password','password is empty').notEmpty();
        let errors = req.validationErrors();
        if(errors){
          resp.redirect("/wauthvendor/login");
          // return resp.status(409).json({
          //   message:"enter your data"
          // });
        }else{
            vendorModel .findOne({ email: req.body.email }, function(err, user) {
                if(err){
                  return resp.status(409).json({
                    message:"error"
                  });
                }
                if(user!=null){

                  if(passwordHash.verify(req.body.password , user.password))
                      {
                            req.session.email = req.body.email;
                            req.session.password=req.body.password;
                            req.session.status="vendor";
                            console.log(req.session.status)
                            console.log(req.session.email);
                            //resp.json({ user: user});
                            resp.redirect('/webvendor/productvendor');
                      }else {
                          resp.redirect("/wauthvendor/login");
                      }
                }else{
                  resp.redirect("/wauthvendor/login");
                  // return resp.status(409).json({
                  //   message:"user not found"
                  // });
                }
            });
        }
});
Router.get('/register',function(req,resp){
    resp.render("content/login-vendor.ejs");
});
Router.post('/register',BodyParserMid,function(req,resp,next){
  vendorModel.findOne({ email: req.body.email }, function(err, user) {
        if(user){
          return resp.status(409).json({
            message:"email is existed"
          });
        }else{
          var name = req.body.name;
          var email = req.body.email;
          var address = req.body.address;
          var password = req.body.password;
          var confPassword = req.body.confPassword;

          req.checkBody('name','name is empty').notEmpty();
          req.checkBody('email','email is empty').notEmpty();
          req.checkBody('email','email is empty').isEmail();
          req.checkBody('address','address is empty').notEmpty();
          req.checkBody('password','password is empty').notEmpty();
          req.checkBody('confPassword','password is not matched').equals(req.body.password);

          let errors = req.validationErrors();
          if(errors){
            resp.json(errors);
          }else{
            //var clientDataModel = mongoose.model("clientData");
            var vendor = new vendorModel({
              name:req.body.name,
              email:req.body.email,
              address:req.body.address,
              password:req.body.password,
              time:new Date()
            });
            var hashedPassword = passwordHash.generate(req.body.password);
            req.session.email = req.body.email;
            req.session.password=req.body.password;
            req.session.status="vendor";
                vendor.password = hashedPassword;
                vendor.save(function(err,doc){
                  if(err){
                    console.log(err);
                  }
                  //const jsontoken = jwt.sign({client: client},'mysecret-key');
                        //resp.json({ vendor: vendor});
                        resp.redirect('/webvendor/productvendor');
                });
          }
        }
    });//end of   clientModel.findOne
});
module.exports=Router;
