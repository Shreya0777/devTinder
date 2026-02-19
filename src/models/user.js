const mongoose = require("mongoose");
const validator= require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    trim: true,
  }, 
  EmailId: {
   type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address:" + value);
      }
    },
    unique: true,
  },
password: {
  type: String,
  required: true,
  minLength: 8,
  // maxLength: 25,
  validate(value) {
    if (!validator.isStrongPassword(value)) {
      throw new Error("Enter a strong password");
    }
  },
},

  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["Male", "Female", "other"].includes(value)) {
        throw new Error("Gender data is invalid");
      }
    },
  },
  photourl: {
    type: String,
    default:
      "https://tse2.mm.bing.net/th/id/OIP.9k6NZTQk5G6g5PVDDDeLiAHaHa?pid=Api&P=0&h=180",
      validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid URL address:" + value);
      }
    }
  },
  About: {
    type: String,
    default: "This is about section...",
  },
  skills:{
    type: [String]
  },
 
},

{
  timestamps: true
}
);
userSchema.methods.getJWT = async function (){
  const user = this;

  const token = await jwt.sign({_id : user._id}, "Shreya@singh12345",{expiresIn: "2d"});
   return token;
}

userSchema.methods.ValidatePassword = async function(paaswordinputuser){
  const user=this;

  const passwprdhash= user.password;

  const isValidatePassword = await  bcrypt.compare(paaswordinputuser,passwprdhash);
  return  isValidatePassword;
}

module.exports = mongoose.model("user", userSchema);
