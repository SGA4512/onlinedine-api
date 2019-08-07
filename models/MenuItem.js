const Joi = require("joi");
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    restaurantId: {
        type: String
    },
    name: {
        type: String
    },
    defaultImg: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    rating: {
        type: Number
    },
    spicy: {
        type: String
    },
    ratingCount: {
        type:Number
    }
});


const MenuItem = mongoose.model('menuitem', menuItemSchema);  
exports.MenuItem = MenuItem;
