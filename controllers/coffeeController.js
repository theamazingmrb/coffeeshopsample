const express = require("express");
const router = express.Router();
const Coffee = require("../models/coffee");

router.get("/", async (req, res) => {
  let coffees = await Coffee.find();
  res.render("coffee/index.ejs", { coffees });
});

// route for seeding coffees
router.get("/seed", async (req, res) => {
  let seededCoffees = await Coffee.create([
    {
      name: "Carmel Frap",
      description: "A cold sweet carmely goodness",
      image:
        "https://simplyhomecooked.com/wp-content/uploads/2021/02/Starbucks-Caramel-Frappuccino-Copycat-recipe-11.jpg",
      price: 8,
      isColdDrink: true,
    },
    {
      name: "Mocha Frap",
      description: "A cold sweet chocolatey goodness",
      image:
        "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190528_MochaFrapp.jpg?impolicy=1by1_wide_topcrop_630",
      price: 8,
      isColdDrink: true,
    },
    {
      name: "Carmel Latte",
      description: "A host sweet carmely hot drink",
      image:
        "https://www.forkinthekitchen.com/wp-content/uploads/2022/06/220518.homemade.caramel.latte-6630.jpg",
      price: 8,
      isColdDrink: false,
    },
  ]);

  res.send(seededCoffees);
});

module.exports = router;
