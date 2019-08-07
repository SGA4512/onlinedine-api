const Joi = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    restaurantId: {
        type: String
    },
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    restaurantName: {
        type: String
    },
    total: {
        type: String
    },
    orderList: {
        type: String
    },
    status: {
        type: String
    },
    orderType:{
        type: String
    },
    date:{
        type: Date
    }
});


const Order = mongoose.model('order', orderSchema);  
exports.Order = Order;
