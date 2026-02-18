const express = require('express');
const {connectDB}=require('./confic/Database');
const app=express();
const cookiesparser = require("cookie-parser");
const {routerAuth}= require('./routes/Auth');
const {routerProfile}= require('./routes/profile');
const {routerRequest} = require('./routes/request');

// parse JSON and cookies before mounting routes so handlers can access `req.body` and `req.cookies`
app.use(express.json());
app.use(cookiesparser());

app.use('/',routerAuth);
app.use('/',routerProfile);
app.use('/',routerRequest);


connectDB().then(()=>{
    console.log("Database is connected");
    app.listen(7777,()=>{
    console.log("Server is running on port 7777");
})
}).catch(()=>{
    console.error("Database connection is failed");
});



