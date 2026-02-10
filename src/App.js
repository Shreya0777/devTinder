const express = require('express');

const app=express();

const {adminAuth,userAuth} = require('./middleware/Auth');

app.use('/admin', adminAuth)
app.get("/admin/Admingetdata",(req,res)=>{
    res.send("Admin data is getting fetched");
});

app.get("/admin/admindelete",(req,res)=>{
    res.send("Admin data is getting deleted");
})
app.get('/user', userAuth,(req,res)=>{
    res.send("User data is getting fetched")
})

app.use('/', (err,req,res,next)=>{
    if(err){
        res.status(500).send("Internal server error");
    }
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})