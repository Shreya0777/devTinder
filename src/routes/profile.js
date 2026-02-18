const express = require('express');
const routerProfile=express.Router();
const {userAuth}= require("../middleware/Auth");

routerProfile.get('/profile', userAuth,async (req,res)=>{
    try{
    const user= req.user;
    if(!user){
        throw new Error("User not find");
    }
    console.log(user);
    res.send(user);
    }
     catch(err){
        res.status(400).send("ERROR:" + err.message)
      }
})

module.exports={routerProfile}