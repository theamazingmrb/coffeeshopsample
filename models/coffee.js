const mongoose = require("../db/connection");

const coffeeSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  isColdDrink: Boolean,
});

const Coffee = new mongoose.model("Coffee", coffeeSchema);

module.exports = Coffee;
