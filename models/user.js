// bring in mongoose thats connected to our db
const mongoose = require("../db/connection");

// set up our user schema
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});

// Set up model using schema

const User = new mongoose.model("User", userSchema);

module.exports = User;
