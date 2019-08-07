const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Booking } = require("../models/Booking");
const express = require("express");
const router = express.Router();

router.get("/restaurantbooking/:restaurantId", async (req, res) => {
  const booking = await Booking.find({ restaurantId: req.params.restaurantId }).sort({date: -1});;
  res.send(booking);
});

router.get("/userbooking/:userId", async (req, res) => {
    const booking = await Booking.find({ userId: req.params.userId }).sort({date: -1});;
    res.send(booking);
  });

router.get("/:id", async (req, res) => {
  const booking = await Booking.find({ _id: req.params.id });
  res.send(booking);
});

router.put("/:id", async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
        restaurantId: req.body.restaurantId,
        userId: req.body.userId,
        userName: req.body.userName,
        restaurantName: req.body.restaurantName,
        noOfPeople: req.body.noOfPeople,
        duration: req.body.duration,
        status: req.body.status,
        date: req.body.date
  },
    { new: true }
  );

  if (!booking)
    return res.status(404).send("The booking with the given ID was not found.");

  res.send(booking);
});

router.post("/", async (req, res) => {

 // let booking = await booking.findOne({ name: req.body.name });
 
 // if (booking) return res.status(400).send("User already exist.");

  let booking = new Booking({
    restaurantId: req.body.restaurantId,
    userId: req.body.userId,
    userName: req.body.userName,
    restaurantName: req.body.restaurantName,
    noOfPeople: req.body.noOfPeople,
    duration: req.body.duration,
    status: "Pending",
    date: req.body.date
  });

  await booking.save();

  res.send(_.pick(booking, ["_id", "restaurantId", "userId", "userName", "noOfPeople", "restaurantName", "duration", "status" ]));

});

router.delete("/:id", async (req, res) => {
  const booking = await Booking.findByIdAndRemove(req.params.id);

  if (!booking)
    return res.status(404).send("The booking with the given ID was not found.");

  res.send(booking);
});

module.exports = router;
