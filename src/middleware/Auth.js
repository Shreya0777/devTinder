const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting check");
    const token = "xyz";
    const isAdminauthorized = token==="xyz";
    if(!isAdminauthorized){
        res.status(401).send("unauthorized user");
    }
    else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log("User auth is getting check");
    const token = "xyz";
    const isAdminauthorized = token==="xyz";
    if(!isAdminauthorized){
        res.status(401).send("unauthorized user");
    }
    else{
        next();
    }
}

module.exports ={adminAuth, userAuth};