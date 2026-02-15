const mongoose = require("mongoose");
const validator= require("validator");

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
      if (!["male", "female", "other"].includes(value)) {
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

module.exports = mongoose.model("user", userSchema);
