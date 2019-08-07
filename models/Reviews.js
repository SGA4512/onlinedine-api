const Joi = require("joi");
const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
    restaurantId: {
        type: String
    },
    userId: {
        type: String
    },
    title: {
        type: String
    },
    comment: {
        type: String
    },
    rating: {
        type: Number
    },
    userName: {
        type: String
    },
    userAvatar: {
        type: String
    },
    date:{
        type: Date
    }
});


const Reviews = mongoose.model('reviews', reviewsSchema);  
exports.Reviews = Reviews;
