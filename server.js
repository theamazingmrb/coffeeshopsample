// bring in  express
const express = require("express");
const app = express();
const PORT = 8000;
const expressLayouts = require("express-ejs-layouts");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.get("/signup", (req, res) => {
  res.render("auth/signup");
});

app.listen(PORT, () => console.log("Can you hear the love on port:", PORT));
