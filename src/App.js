const express = require('express');
const {connectDB}=require('./confic/Database');
const app=express();
const User =require('./models/user');
const {ValidateSignup}= require('./utils/Validator')
const bcrypt= require("bcryptjs")
const cookiesparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

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
        const token= await jwt.sign({_id : user._id}, "Shreya@singh12345")
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

app.get('/profile',async (req,res)=>{
    try{
    const cookies= req.cookies;
    const {token} = cookies;

    //validate
    if(!token){
        throw new Error("Invalid Token");
    }

    const decodedMessage= await jwt.verify(token,"Shreya@singh12345");
    console.log(decodedMessage);

    const {_id} = decodedMessage;
    const user= await User.findById(_id);
    if(!user){
        throw new Error("Please login again");
    }

    
    console.log(user);
    res.send(user);
    }
     catch(err){
        res.status(400).send("ERROR:" + err.message)
      }
})
//get user by email

app.get('/user', async (req,res)=>{
    const UserEmail = req.body.EmailId

    try {
        const users = await User.findOne({EmailId: UserEmail});
        if(users.length === 0){
            res.status(404).send("User not found");
        }
        else{
             res.send(users);
        }
        
    }
    catch{
        res.status(400).send("something went wrong");
    }
})

//feed

app.get('/feed', async(req,res)=>{
    try{
        const user= await User.find({});
        res.send(user);
    }
    catch{
        res.status(400).send("something went wrong");
    }
})


// Find by ID
app.get("/users", async (req, res) => {
    const userId = req.body.userId;   // also make sure correct field name

    try {
        console.log(userId);

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);
    } 
    catch (err) {
        console.error(err);
        res.status(400).send("Invalid ID format");
    }
});

//delete the user

app.delete('/user', async (req,res)=>{
    const userid = req.body.userId
    try{
        const user= await User.findByIdAndDelete(userid);
        res.send("user deleted successfully");
    }
    catch{
        res.status(400).send("Something went wrong")
    }
})

//update an user
app.patch("/user/:userId", async (req,res)=>{
 const userId = req.params?.userId;
 const data = req.body;
 

try {
   const AllowedUpdates = ["userId","photourl","About","gender","age","skills"];

   const isUpdateAllowed = Object.keys(data).every((k) =>
      AllowedUpdates.includes(k)
   );

   if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
   }

   if (Array.isArray(data.skills) && data.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
   }

   await User.findByIdAndUpdate(userId, data, { runValidators: true });

   res.send("User updated successfully");
}
catch (error) {
   console.log(error);
   res.status(400).send(error.message);
}

});

//api level validation




connectDB().then(()=>{
    console.log("Database is connected");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})
}).catch(()=>{
    console.error("Database connection is failed");
});



