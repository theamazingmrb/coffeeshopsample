// bring in  express
const express = require("express");
const app = express();
const PORT = 8000;
const expressLayouts = require("express-ejs-layouts");
const User = require("./models/user");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(expressLayouts);
// without express.urlencoded we cannot use form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.post("/login", async (req, res) => {
  console.log(req.body);

  let userToLogin = await User.findOne({ username: req.body.username });
  // if we find the user lets compare the password
  if (userToLogin) {
    if (userToLogin.password === req.body.password) {
      res.send("Woo your logged in");
    } else {
      res.send("Incorrect Passord");
    }
  }
});

app.post("/signup", async (req, res) => {
  console.log(req.body);

  if (req.body.username && req.body.password) {
    let newUser = await User.create(req.body);

    res.send(newUser);
  }
});

app.get("/signup", (req, res) => {
  res.render("auth/signup");
});

app.listen(PORT, () => console.log("Can you hear the love on port:", PORT));
