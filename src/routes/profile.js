const express = require("express");
const routerProfile = express.Router();
const { userAuth } = require("../middleware/Auth");
const { ValidateUpdate } = require("../utils/Validator");
const bcrypt = require("bcryptjs");

routerProfile.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not find");
    }
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

routerProfile.patch("/profile/update", userAuth, async (req, res) => {
  try {
    if (!ValidateUpdate(req)) {
      throw new Error("This fields are not allowed to update");
    }

    const loggedInuser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));

    await loggedInuser.save();
    res.send(`${loggedInuser.firstName} profile is updated successfully`);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

routerProfile.patch("/profile/password/update", userAuth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    let { password } = req.body;

    const passwordhash = await bcrypt.hash(password, 10);
    password=passwordhash;
    if (!password) {
      throw new Error("Password is required");
    }
    loggedInuser.password = password;
    await loggedInuser.save();

    res.send("Password is updated successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = { routerProfile };
