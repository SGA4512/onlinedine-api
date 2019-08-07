const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { Order } = require("../models/Order");
const express = require("express");
const router = express.Router();

router.get("/restaurantorder/:restaurantId", async (req, res) => {
  const order = await Order.find({ restaurantId: req.params.restaurantId }).sort({date: -1});;
  res.send(order);
});

router.get("/userorder/:userId", async (req, res) => {
    const order = await Order.find({ userId: req.params.userId }).sort({date: -1});;
    res.send(order);
  });

router.get("/:id", async (req, res) => {
  const order = await Order.find({ _id: req.params.id });
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
        restaurantId: req.body.restaurantId,
        userId: req.body.userId,
        userName: req.body.userName,
        total: req.body.total,
        restaurantName: req.body.restaurantName,
        orderList: req.body.orderList,
        status: req.body.status,
        orderType: req.body.orderType,
        date: new Date().toLocaleString()
  },
    { new: true }
  );

  if (!order)
    return res.status(404).send("The Order with the given ID was not found.");

  res.send(order);
});

router.post("/", async (req, res) => {

 // let order = await Order.findOne({ name: req.body.name });
 
 // if (order) return res.status(400).send("User already exist.");

  let order = new Order({
        restaurantId: req.body.restaurantId,
        userId: req.body.userId,
        userName: req.body.userName,
        total: req.body.total,
        restaurantName: req.body.restaurantName,
        orderList: req.body.orderList,
        status: "Placed",
        orderType: req.body.orderType,
        date: new Date().toLocaleString()
  });

  await order.save();

  res.send(_.pick(order, ["_id", "restaurantId", "name", "description", "rating", "defaultImg", "price", "spicy" ]));

});

router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);

  if (!order)
    return res.status(404).send("The order with the given ID was not found.");

  res.send(order);
});

module.exports = router;
