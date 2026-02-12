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

//Find by id

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

connectDB().then(()=>{
    console.log("Database is connected");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})
}).catch(()=>{
    console.error("Database connection is failed");
});



