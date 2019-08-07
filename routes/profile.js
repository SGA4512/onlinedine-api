const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Profile, validate } = require("../models/profile");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {

  const profile = await Profile.find({ userId: req.params.id });
  res.send(profile);
});

router.put("/:id", async (req, res) => {
 
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const profile = await Profile.findByIdAndUpdate(
    req.params.id,
    {
        userId: req.body.userId,
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        orders: req.body.orders,
        reviews: req.body.reviews,
        credits: req.body.credits
  },
    { new: true }
  );

  if (!profile)
    return res.status(404).send("The profile with the given ID was not found.");

  res.send(profile);
});


router.put("/updateOrders/:id", async (req, res) => {
  let profile = await Profile.findOne({ userId: req.params.id });

  profile.orders = Number(profile.orders) + 1;
  profile.credits = Number(profile.credits) + 2;
  
  await profile.save();
  res.send(_.pick(profile, ["_id", "userId", "name"]));
});

router.put("/updateReviews/:id", async (req, res) => {
  let profile = await Profile.findOne({ userId: req.params.id });

  profile.reviews = Number(profile.reviews) + 1;
  profile.credits = Number(profile.credits) + 1;
  
  await profile.save();
  res.send(_.pick(profile, ["_id", "userId", "name"]));
});

router.post("/", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let profile = await Profile.findOne({ userId: req.body.userId });
  if (profile) return res.status(400).send("User already exist.");

  profile = new Profile({
    userId: req.body.userId,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
    orders: req.body.orders,
    reviews: req.body.reviews,
    credits: req.body.credits
});

await profile.save();

res.send(_.pick(profile, ["_id", "userId", "name"]));

});

module.exports = router;
