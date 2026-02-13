const mongoose = require("mongoose");

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
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 15,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(value);
      },
      message:
        "Password must contain at least one letter, one number, one special character and be at least 8 characters long",
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
  },
  About: {
    type: String,
    default: "This is about section...",
  },
});

module.exports = mongoose.model("user", userSchema);
