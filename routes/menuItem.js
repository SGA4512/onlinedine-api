const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { MenuItem } = require("../models/MenuItem");
const express = require("express");
const router = express.Router();

router.get("/all/:restaurantId", async (req, res) => {
  const menuItem = await MenuItem.find({ restaurantId: req.params.restaurantId });
  res.send(menuItem);
});

router.get("/:id", async (req, res) => {
  const menuItem = await MenuItem.find({ _id: req.params.id });
  res.send(menuItem);
});

router.put("/:id", async (req, res) => {
  const menuItem = await MenuItem.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        restaurantId: req.body.restaurantId,
        defaultImg: req.body.defaultImg,
        description: req.body.description,
        rating: req.body.rating,
        price: req.body.price,
        spicy: req.body.spicy,
        ratingCount: req.body.ratingCount
  },
    { new: true }
  );

  if (!menuItem)
    return res.status(404).send("The menuItem with the given ID was not found.");

  res.send(menuItem);
});

router.post("/", async (req, res) => {

  let menuItem = await MenuItem.findOne({ name: req.body.name });
 
  if (menuItem) return res.status(400).send("User already exist.");

  menuItem = new MenuItem({
    name: req.body.name,
        restaurantId: req.body.restaurantId,
        defaultImg: req.body.defaultImg,
        description: req.body.description,
        rating: 0,
        price: req.body.price,
        spicy: req.body.spicy,
        ratingCount: 0
  });

  await menuItem.save();

  res.send(_.pick(menuItem, ["_id", "restaurantId", "name", "description", "rating", "defaultImg", "price", "spicy" ]));

});

router.delete("/:id", async (req, res) => {
  const menuItem = await MenuItem.findByIdAndRemove(req.params.id);

  if (!menuItem)
    return res.status(404).send("The menuItem with the given ID was not found.");

  res.send(menuItem);
});


router.put("/updaterating/:id", async (req, res) => {

  let menuItem = await MenuItem.findOne({ _id: req.params.id });
  let oldSum = Number(menuItem.rating) * Number(menuItem.ratingCount);
  newSum = oldSum + req.body.rating;
  menuItem.ratingCount = menuItem.ratingCount + 1;
  menuItem.rating = newSum / menuItem.ratingCount;
  
  await menuItem.save();
  res.send(_.pick(menuItem, ["_id", "restaurantId", "name"]));

});

module.exports = router;
