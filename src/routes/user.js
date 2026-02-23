const express = require("express");
const routerUser=express.Router();
const {userAuth}= require("../middleware/Auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

routerUser.get("/user/feed", userAuth, async(req,res)=>{
    try{
        const loggedInuser = req.user;
        let limit = parseInt(req.query.limit)|| 10;
        let page = parseInt(req.query.page )||1;
        limit = limit>25? 25: limit;
        const skip = (page-1)*limit;
        const connectionrequest = await connectionRequest.find({
            $or:[
                {fromUserId: loggedInuser._id},
                {toUserId: loggedInuser._id}
            ]
        });
        const hideUserFromFeed = new Set();
        connectionrequest.forEach((row)=>{
            hideUserFromFeed.add(row.fromUserId.toString());
            hideUserFromFeed.add(row.toUserId.toString());

        });
        const users = await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUserFromFeed)}},
                {_id:{$ne: loggedInuser._id}}
            ]

        }).select(User_data)
          .skip(skip)
          .limit(limit);

        res.send(users);

    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})
module.exports = {routerUser};