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

const ValidateUpdate=(req)=>{
    const AllowedUpdateFields=["firstName","lastName","age","gender","photourl","About","skills"];

    const isAllowed = Object.keys(req.body).every((field)=>( AllowedUpdateFields.includes(field)));
    return isAllowed;
}

module.exports={ValidateSignup, ValidateUpdate};