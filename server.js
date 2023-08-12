// bring in  express
const express = require("express");
const app = express();
const PORT = 8000;
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./controllers/authController");
const session = require("express-session");
const coffeeRoutes = require("./controllers/coffeeController");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(expressLayouts);
app.use(
  // one hour login time
  session({ secret: "somestringreandomdwd", cookie: { maxAge: 3600000 } })
);

// without express.urlencoded we cannot use form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// anywhere below middlewares
app.use(authRoutes);

app.get("/", (req, res) => {
  res.render("home.ejs");
});
// define our own middle to check for a loggin user
// if no user go to login screen
app.use((req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
    return;
  }

  next();
});

app.use("/coffee", coffeeRoutes);

app.listen(PORT, () => console.log("Can you hear the love on port:", PORT));
