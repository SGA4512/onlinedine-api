const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Reviews } = require("../models/Reviews");
const express = require("express");
const router = express.Router();

router.get("/all/:restaurantId", async (req, res) => {
  const reviews = await Reviews.find({ restaurantId: req.params.restaurantId }).sort({date: -1});
  res.send(reviews);
});

router.get("/:id", async (req, res) => {
  const reviews = await Reviews.find({ _id: req.params.id });
  res.send(reviews);
});

router.put("/:id", async (req, res) => {
  const reviews = await Reviews.findByIdAndUpdate(
    req.params.id,
    {
        restaurantId: req.body.restaurantId,
        userId: req.body.userId,
        title: req.body.title,
        comment: req.body.comment,
        rating: req.body.rating,
        userName: req.body.userName,
        userAvatar: req.body.userAvatar,
        date: new Date().toLocaleString()
  },
    { new: true }
  );

  if (!reviews)
    return res.status(404).send("The reviews with the given ID was not found.");

  res.send(reviews);
});

router.post("/", async (req, res) => {

  //let reviews = await Reviews.findOne({ name: req.body.name });
 
 // if (reviews) return res.status(400).send("User already exist.");

  reviews = new Reviews({
        restaurantId: req.body.restaurantId,
        userId: req.body.userId,
        title: req.body.title,
        comment: req.body.comment,
        rating: req.body.rating,
        userName: req.body.userName,
        userAvatar: req.body.userAvatar,
        date: new Date().toLocaleString()
  });

  await reviews.save();

  res.send(_.pick(reviews, ["_id", "restaurantId", "userId", "title", "comment", "rating", "userName", "userAvatar", "date" ]));

});

router.delete("/:id", async (req, res) => {
  const reviews = await Reviews.findByIdAndRemove(req.params.id);

  if (!reviews)
    return res.status(404).send("The reviews with the given ID was not found.");

  res.send(reviews);
});

module.exports = router;
