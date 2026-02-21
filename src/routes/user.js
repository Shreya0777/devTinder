const express = require("express");
const routerUser=express.Router();
const {userAuth}= require("../middleware/Auth");
const connectionRequest = require("../models/connectionRequest");

const User_data ="firstName lastName photourl age gender About skills"

routerUser.get("/user/request/received", userAuth, async (req,res)=>{
    try{
        const loggedInuser = req.user;
        const connectionrequest = await connectionRequest.find({
            toUserId:loggedInuser._id,
            status: "interested",
        }).populate("fromUserId",User_data )
         res.json({
            message:"Connection requests",
            data: connectionrequest
         })
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})

routerUser.get('/user/connection', userAuth, async (req,res)=>{
    try{
        const loggedInuser = req.user;

        const connectionrequest = await connectionRequest.find({
            $or:[
            {toUserId: loggedInuser._id, status:"Accepted" },
            {fromUserId : loggedInuser._id, status: "Accepted"}
            ]
        }).populate("fromUserId", User_data).populate("toUserId", User_data);

        const data = connectionrequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInuser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })


        res.json({
            data
        })

    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})
module.exports = {routerUser};