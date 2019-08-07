const Joi = require("joi");
const mongoose = require("mongoose");

const itemReviewsSchema = new mongoose.Schema({
    restaurantId: {
        type: String
    },
    userId: {
        type: String
    },
    menuItemId: {
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


const ItemReviews = mongoose.model('itemReviews', itemReviewsSchema);  
exports.ItemReviews = ItemReviews;
