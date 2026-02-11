const express = require('express');
const {connectDB}=require('./confic/Database');
const app=express();
const User =require('./models/user');

app.use(express.json());

app.post("/signup", async(req,res)=>{
     const user=new User (req.body);
     try{
        await user.save();
        res.send("User is created successfully");
     }
     catch(err){
        res.status(400).send("Error in creating user"+ err.message);
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



