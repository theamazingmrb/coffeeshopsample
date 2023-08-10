const mongoose = require("mongoose");

// mongoose.connect - to tell mongoose what database
mongoose.connect(
  "mongodb+srv://admin:uohW3I7XndvkgEcd@sei-tumeric.hbuqbhu.mongodb.net/coffee-app"
);

// check for error or successful connection
mongoose.connection.on("connected", () => console.log("Yay connected"));
mongoose.connection.on("error", () => console.log("Oh noo Error"));

module.exports = mongoose;
