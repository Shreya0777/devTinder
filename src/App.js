const express = require('express');

const app=express();


//request handler
app.use("/test", (req,res)=>{
    res.send("This is test route");
});

app.get('/user',(req,res) =>{
    res.send({firstname: "Shreya", Lastname: "Singh"});
})

app.post('/user',(req,res)=>{
    res.send('user created successfully');
})

app.delete('/user' , (req,res) =>{
    res.send('user deleted successfully')
})

// app.use("/hello",(req,res)=>{
//     res.send("Hello world");
// });


// app.use("/",(req,res)=>{
//     res.send("Hello from server");
// });



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})