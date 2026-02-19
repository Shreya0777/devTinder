const express = require('express');
const {ValidateSignup}= require('../utils/Validator');
const bcrypt = require('bcryptjs');
const User =require('../models/user');
const jwt = require("jsonwebtoken");

const routerAuth=express.Router();
routerAuth.post("/signup", async(req,res)=>{
      //validation of data
      try{
      ValidateSignup(req);

      const {firstName,lastName,EmailId,password}=req.body;

      //encryption of data
      const passwordhash =  await bcrypt.hash(password,10)
      console.log(passwordhash);
       

     const user=new User ({
        firstName,
        lastName,
        EmailId,
        password:passwordhash,

      });
     
        await user.save();
        res.send("User is created successfully");
     }
     catch(err){
        res.status(400).send("Error in creating user"+ err.message);
     }
        
});

routerAuth.post('/login' , async (req,res)=>{
    
      try{

      const {EmailId,password} =req.body;
      const user = await User.findOne({EmailId:EmailId});

      if(!user){
        throw new Error("Invalid credentials");
      }
      const isPasswordvalid = await user.ValidatePassword(password);
      if(isPasswordvalid)
      {
        //create a JWT Token
        const token= await user.getJWT();
        console.log(token);
          
        //Add token to the cookies and send the response back
        res.cookie("token", token);
        res.send("Login Successfully");
      }
      else{
        res.send("Invalid Credentials");
      }
      }
      catch(err){
        res.status(400).send("ERROR:" + err.message)
      }
      
      
    

})

routerAuth.post('/logout',(req,res)=>{
  res.cookie("token", null,{
  expires: new Date(Date.now())
  })
  res.send("Logout successfully");
})

module.exports = {routerAuth};