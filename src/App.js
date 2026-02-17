const express = require('express');
const {connectDB}=require('./confic/Database');
const app=express();
const User =require('./models/user');
const {ValidateSignup}= require('./utils/Validator')
const bcrypt= require("bcryptjs")
const cookiesparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}= require("./middleware/Auth");

app.use(express.json());
app.use(cookiesparser());

app.post("/signup", async(req,res)=>{
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
// login api

app.post('/login' , async (req,res)=>{
    
      try{

        const {EmailId,password} =req.body;
      const user = await User.findOne({EmailId:EmailId});

      if(!user){
        throw new Error("Invalid credentials");
      }
      const isPasswordvalid = await bcrypt.compare(password,user.password);
      if(isPasswordvalid)
      {
        //create a JWT Token
        const token= await jwt.sign({_id : user._id}, "Shreya@singh12345",{expiresIn: "1d"})
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

app.get('/profile', userAuth,async (req,res)=>{
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


app.post('/sendconnectionRequest',  userAuth,async (req,res)=>{
    const user = req.user;
    console.log("sending connection request");
    res.send(user.firstName+" "+ "sent the connection req");
})




connectDB().then(()=>{
    console.log("Database is connected");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})
}).catch(()=>{
    console.error("Database connection is failed");
});



