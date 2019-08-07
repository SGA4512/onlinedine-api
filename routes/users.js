const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.params.id).select("-__v");
  res.send(user);
});

router.put("/:id", async (req, res) => {
 
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zip: req.body.zip,
      password: req.body.password
  },
    { new: true }
  );

  if (!user)
    return res.status(404).send("The user with the given ID was not found.");

  res.send(user);
});

router.get("/list", async (req, res) => {
  const users = await User.find()
    .select("-__v")
    .sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zip: req.body.zip,
    password: req.body.password
});

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email", "role"]));
});

module.exports = router;
