// using express router to attach routes and export them
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  console.log(req.body);

  let userToLogin = await User.findOne({ username: req.body.username });
  // if we find the user lets compare the password
  if (userToLogin) {
    bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
      // result is true or false
      // true the password matched
      // false no match
      if (result) {
        res.send("Woo your logged in");
      } else {
        res.send("Incorrect Passord");
      }
    });
  }
});

router.post("/signup", async (req, res) => {
  // we should hash passoword before User.create()
  if (req.body.username && req.body.password) {
    let plainTextPassword = req.body.password;
    bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let newUser = await User.create(req.body);

      res.send(newUser);
    });
  }
});

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

module.exports = router;
