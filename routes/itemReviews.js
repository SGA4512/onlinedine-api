const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { ItemReviews } = require("../models/ItemReviews");
const express = require("express");
const router = express.Router();

router.get("/all/:restaurantId", async (req, res) => {
  const itemReviews = await ItemReviews.find({ menuItemId: req.params.restaurantId }).sort({date: -1});
  res.send(itemReviews);
});

router.get("/:id", async (req, res) => {
  const itemReviews = await ItemReviews.find({ _id: req.params.id });
  res.send(itemReviews);
});

router.put("/:id", async (req, res) => {
  const itemReviews = await ItemReviews.findByIdAndUpdate(
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

  if (!itemReviews)
    return res.status(404).send("The itemReviews with the given ID was not found.");

  res.send(itemReviews);
});

router.post("/", async (req, res) => {

  //let reviews = await Reviews.findOne({ name: req.body.name });
 
 // if (reviews) return res.status(400).send("User already exist.");

 itemReviews = new ItemReviews({
        restaurantId: req.body.restaurantId,
        menuItemId: req.body.menuItemId,
        userId: req.body.userId,
        title: req.body.title,
        comment: req.body.comment,
        rating: req.body.rating,
        userName: req.body.userName,
        userAvatar: req.body.userAvatar,
        date: new Date().toLocaleString()
  });

  await itemReviews.save();

  res.send(_.pick(itemReviews, ["_id", "restaurantId", "userId", "title", "comment", "rating", "userName", "userAvatar", "date" ]));

});

router.delete("/:id", async (req, res) => {
  const itemReviews = await ItemReviews.findByIdAndRemove(req.params.id);

  if (!itemReviews)
    return res.status(404).send("The itemReviews with the given ID was not found.");

  res.send(itemReviews);
});

module.exports = router;
