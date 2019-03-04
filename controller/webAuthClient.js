var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
require("../Model/clientData");
//var passwordHash = require('./lib/password-hash');
var passwordHash = require('password-hash');//for generate hashed password and verifiy

var clientModel = mongoose.model('clientData');
const path = require('path');
 //var ClientModel = mongoose.model('clientData');
 Router.get('/login',function(req,resp){
   //resp.json({msg:"hello client"});
   resp.render("userlayout/login.ejs");

 });
Router.post('/login',BodyParserMid,function(req,resp){
        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('email','email is empty').notEmpty();
        req.checkBody('email','email is not email').isEmail();
        req.checkBody('password','password is empty').notEmpty();
        let errors = req.validationErrors();
        if(errors){
          resp.json(errors)
          // return resp.status(409).json({
          //   message:"enter your data"
          // });
        }else{
            clientModel.findOne({ email: req.body.email }, function(err, user) {
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
                        req.session.status="client";
                        req.session.client_id=user._id;
                          // const jsontoken = jwt.sign({user: user},'mysecret-key');
                          //   resp.json({ user: user, token:jsontoken});
                          resp.redirect("/webuser/index");
                      }else {
                          resp.json([{err:"password not valid"},false]);
                      }
                }else{
                  return resp.status(409).json({
                    message:"user not found"
                  });
                }
            });
        }
});
Router.get('/register',function(req,resp){
  resp.render("userlayout/create-account.ejs");
});
Router.post('/register',BodyParserMid,function(req,resp,next){
    clientModel.findOne({ email: req.body.email }, function(err, user) {
        if(user){
          return resp.status(409).json({
            message:"email is existed"
          });
        }else{
          var name = req.body.name;
          var email = req.body.email;
          var phone = req.body.phone;
          var password = req.body.password;
          var confPassword = req.body.confPassword;

          req.checkBody('name','name is empty').notEmpty();
          req.checkBody('email','email is empty').notEmpty();
          req.checkBody('email','email is empty').isEmail();
          req.checkBody('phone','phone is empty').notEmpty();
          req.checkBody('password','password is empty').notEmpty();
          req.checkBody('confPassword','password is not matched').equals(req.body.password);

          let errors = req.validationErrors();
          if(errors){
            resp.json(errors);
          }else{
            var clientDataModel = mongoose.model("clientData");
            var client = new clientDataModel({
              name:req.body.name,
              email:req.body.email,
              phone:req.body.phone,
              password:req.body.password,
              time:new Date()
            });
            var hashedPassword = passwordHash.generate(req.body.password);
                client.password = hashedPassword;
                req.session.email = req.body.email;
                req.session.password=req.body.password;
                req.session.status="client";
                req.session.client_id=user._id;
                client.save(function(err,doc){
                  if(err){
                    console.log(err);
                  }
                  const jsontoken = jwt.sign({client: client},'mysecret-key');
                        resp.json({ client: client, token:jsontoken});
                });
          }
        }
    });//end of   clientModel.findOne
});


module.exports=Router;
