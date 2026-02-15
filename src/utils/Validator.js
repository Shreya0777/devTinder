const validator = require("validator");

const ValidateSignup=(req)=>{
    const {firstName,lastName,EmailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
    else if(!validator.isEmail(EmailId)){
        throw new Error("Email is invalid");
    }
}

module.exports={ValidateSignup,};