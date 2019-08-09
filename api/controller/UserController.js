var mongoose = require('mongoose');
UserData = mongoose.model('UserInfo');
// const express=require('express');
var bcrypt = require('bcryptjs');
// const router=express.Router();
// var fs = require("fs");
var jwt=require('jsonwebtoken');
// UserAppointment =mongoose.model('appointment');
var isAuth=require('../Midleware/isAuth');

//get all users
exports.getAllUsers = function(req, res) {
 console.log(req.body);
  UserData.find({}, function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
    console.log(data);
  });
};

exports.getUser = function(req, res){
  console.log(req.params.emailId);    
  UserData.find({email: req.params.emailId},
    function(err, data){
      if (err)
      res.send(err);
      res.json(data);
      console.log(data);
    });
};

exports.userSignup = function(req, res){
  console.log("hi signup")
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  const reg_pwd=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  // if(!reg_pwd.test(req.body.Password)){
  //   res.send('password is invalid');
  // }

  if(reg_email.test(req.body.Email)){
    console.log(req.body);
    UserData.find({Email: req.body.Email},function(err, data){
      if(data != null && data != ''){
        res.send('User already exists');
      }
      else
      {
        var userData = new UserData(req.body);
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(userData.Password, salt, function(err, hash) {
            userData.Password = hash;
            userData.save(function(err, data){
              if(err)
                res.send(err.message);
              res.json(data);
              res.json("user succesfully created");
            })
          })
        })
      }
    });
  }
  else {
    res.send('Email is invalid');
  }
};

exports.userSignin = (req,res,next) =>{
  console.log(req.body);
  const Email = req.body.Email;
  const Password = req.body.Password;
  let loadedUser;
  UserData.findOne({Email: Email})
  .then(user =>{
  if(!user){
  const error = new Error('A user with this email could not be found.');
  error.statusCode = 401;
  throw error;
  }
  loadedUser = user;
 const token = jwt.sign(
 {
 email: loadedUser.email,
 userId:loadedUser._id.toString()
 },'secret')
 return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email})
}) 
.catch(err => {
  if (!err.statusCode) {
  err.statusCode = 500;
  }
  next(err);
  
  });
}
// router.route('/signin').post(function(req,res){
//   console.log('login entered');
//   try{
//   User.findOne({Email: req.body.Email},function(err,user){
  
//   console.log('enterd findone' + req.body.Email);
//   if(err)
//   {
//   console.log('entered error');
//   throw err;
//   }
//   if(!user)
//   {
//   console.log('No a User');
//   console.log(user);
  
//   res.status(400).json({'Login': 'Authentication failed. User not found.'});
//   }
//   else if(user)
//   {
//   console.log('User');
//   if(user.Password != req.body.Password)
//   {
//   res.status(400).send({'Login': 'Authentication failed. Wrong Password.'});
//   }
//   else
//   {
//   const payload = {
//   isAdmin : user.isAdmin
//   }
//   var token = jwt.sign(payload,config.secret,{
//   expiresIn : '6h'
//   });
  
//   res.json({
//   success: true,
//   token: token
//   });
//   }
//   }
  
//   });
//   }
//   catch(er){
//   console.log(er);
//   }
  
//   });
  exports.getAllSignin = (isAuth,function(req, res) {
    console.log("hello")
     UserData.find({userId:req.decodedToken}, function(err, data) {
       if (err)
         res.send(err);
       res.json(data); 
     });
   });
   
exports.updateUser = function(req, res) {
  UserData.findOneAndUpdate({_id: req.body.userId}, 
    req.body, {new: true}, function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
    });
};


exports.Appointments = function(req, res){
 console.log("hi signup")
 var userAppointment = new UserAppointment(req.body);
 userAppointment.save(function(err, data){
    if(err)
      res.send(err.message);
      res.json(data);
 })
}

exports.getAllAppointment = (isAuth,function(req, res) {
  console.log("hello")
  UserAppointment.find({userId:req.decodedToken}, function(err, data) {
     if (err)
       res.send(err);
     res.json(data);
    
   });
 });











 