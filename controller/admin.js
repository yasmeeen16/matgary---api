var express = require('express');
var Router = express.Router();
var BodyParser = require('body-parser');
var expressValidato = require('express-validator');
var BodyParserMid = BodyParser.urlencoded();//middle ware to get data from request body
var mongoose = require("mongoose");
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');//for generate hashed password and verifiy
const path = require('path');
require('../Model/admin');
var adminModel = mongoose.model("admin");


Router.post('/login',BodyParserMid,function(req,resp){
        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('email','email is empty').notEmpty();
        req.checkBody('email','email is not email').isEmail();
        req.checkBody('password','password is empty').notEmpty();
        let errors = req.validationErrors();
        if(errors){
          return resp.status(409).json({
            message:"enter your data"
          });
        }else{
            adminModel.findOne({ email: req.body.email }, function(err, user) {
                if(err){
                  return resp.status(409).json({
                    message:"error"
                  });
                }
                if(user!=null){

                  if(passwordHash.verify(req.body.password , user.password))
                      {
                          const jsontoken = jwt.sign({user: user},'mysecret-key');
                            resp.json({ user: user, token:jsontoken});
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

Router.post('/register',BodyParserMid,function(req,resp,next){
  //resp.json(req.body)
  adminModel.findOne({ email: req.body.email }, function(err, user) {
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
          var adminModel = mongoose.model("admin");
          var admin = new adminModel({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            time:new Date()
          });
          var hashedPassword = passwordHash.generate(req.body.password);
              admin.password = hashedPassword;
              admin.save(function(err,doc){
                if(err){
                  console.log(err);
                }
                const jsontoken = jwt.sign({admin: admin},'mysecret-key');
                      resp.json({ admin: admin, token:jsontoken});
              });
        }
      }
  });//end of   clientModel.findOne

});

module.exports=Router;
