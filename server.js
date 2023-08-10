// bring in  express
const express = require("express");
const app = express();
const PORT = 8000;
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./controllers/authController");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(expressLayouts);
// without express.urlencoded we cannot use form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// anywhere below middlewares
app.use(authRoutes);

app.listen(PORT, () => console.log("Can you hear the love on port:", PORT));
