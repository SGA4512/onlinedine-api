const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Restaurant } = require("../models/restaurant");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find()
    .select("-__v")
    .sort("name");
  res.send(restaurants);
});

router.get("/:id", async (req, res) => {
  const restaurant = await Restaurant.find({ restaurantId: req.params.id });
  res.send(restaurant);
});

router.put("/:id", async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        restaurantId: req.body.restaurantId,
        defaultImg: req.body.defaultImg,
        about: req.body.about,
        cuisine: req.body.cuisine,
        rating: req.body.rating,
        hours: req.body.hours,
        email: req.body.email,
        phone: req.body.phone,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        zip: req.body.zip
  },
    { new: true }
  );

  if (!restaurant)
    return res.status(404).send("The restaurant with the given ID was not found.");

  res.send(restaurant);
});

router.post("/", async (req, res) => {

  let restaurant = await Restaurant.findOne({ restaurantId: req.body.userId });
 
  if (restaurant) return res.status(400).send("User already exist.");

  restaurant = new Restaurant({
    name: req.body.name,
    restaurantId: req.body.restaurantId,
    defaultImg: req.body.defaultImg,
    about: req.body.about,
    cuisine: req.body.cuisine,
    rating: 0,
    ratingCount: 0,
    hours: req.body.hours,
    email: req.body.email,
    phone: req.body.phone,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip
});

await restaurant.save();

res.send(_.pick(restaurant, ["_id", "restaurantId", "name"]));

});


router.put("/updaterating/:id", async (req, res) => {

  let restaurant = await Restaurant.findOne({ restaurantId: req.params.id });
  let oldSum = Number(restaurant.rating) * Number(restaurant.ratingCount);
  newSum = oldSum + req.body.rating;
  restaurant.ratingCount = restaurant.ratingCount + 1;
  restaurant.rating = newSum / restaurant.ratingCount;
  
  await restaurant.save();
  res.send(_.pick(restaurant, ["_id", "restaurantId", "name"]));

});

module.exports = router;
