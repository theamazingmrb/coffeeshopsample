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
        // set the users id onto the sessions,
        // this is useful when we start associated users to other models like
        // Orders
        // We can store anything we want on req.session to use it later
        // in this case we are making a new key called userId and setting
        // it to the users id whos logging in.
        req.session.userId = userToLogin._id;
        req.session.name = userToLogin.name;

        res.redirect("/coffee");
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

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
