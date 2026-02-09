const express = require('express');

const app=express();


app.get("/user",(req,res,next)=>{
    console.log("1st route");
    next();
},
(req,res,next)=>{
    console.log("2nd rout");
    next();
},(req,res,next)=>{
    console.log("3rd route");
    res.send("hello from 3rd route");
    next();// goes in thecall stack and return immediately as there is no more code to execute
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})