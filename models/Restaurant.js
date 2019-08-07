const Joi = require("joi");
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurantId: {
        type: String
    },
    name: {
        type: String
    },
    defaultImg: {
        type: String
    },
    about: {
        type: String
    },
    cuisine: {
        type: String
    },
    rating: {
        type: Number
    },
    ratingCount:{
        type: Number
    },
    hours: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    street:  {
        type: String
    },
    city:  {
        type: String
    },
    state:  {
        type: String
    },
    country:  {
        type: String
    },
    zip:  {
        type: String
    }
});


const Restaurant = mongoose.model('restaurant', restaurantSchema);  
exports.Restaurant = Restaurant;
