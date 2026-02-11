const express = require('express');
const {connectDB}=require('./confic/Database');
const app=express();
const User =require('./models/user');



app.post("/signup", async(req,res)=>{
     const user=new User ({
        firstName: "Shreya",
        lastName:"Singh",
        EmailId: "shreya@gmail.com",
        password:"Shreya@123"
        
    });
    try{await user.save();
    res.send("user added successfully");}
    catch(err){
        res.status(400).send("error in adding user" + err.message);
    }
});


connectDB().then(()=>{
    console.log("Database is connected");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})
}).catch(()=>{
    console.error("Database connection is failed");
});



