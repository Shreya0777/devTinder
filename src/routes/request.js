const express = require('express');
const routerRequest=express.Router();
const {userAuth}= require("../middleware/Auth");

routerRequest.post('/sendconnectionRequest',  userAuth,async (req,res)=>{
    const user = req.user;
    console.log("sending connection request");
    res.send(user.firstName+" "+ "sent the connection req");
})

module.exports ={routerRequest}