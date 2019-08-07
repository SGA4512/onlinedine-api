const Joi = require("joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
    noOfPeople: {
        type: Number
    },
    duration:{
        type: Number
    },
    status:{
        type: String
    },
    date:{
        type: Date
    }
});


const Booking = mongoose.model('booking', bookingSchema);  
exports.Booking = Booking;
