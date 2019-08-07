const Joi = require("joi");
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    about: {
      type: String
    },
    orders: {
      type: Number
    },
    reviews: {
      type: Number
    },
    credits: {
      type: Number
    }
});


const Profile = mongoose.model('profile', profileSchema);

function validateUser(profile) {
    const schema = {
      userId: Joi.string(),
      name: Joi.string(),
      avatar: Joi.string(),
      about: Joi.string(),
      orders: Joi.number(),
      reviews: Joi.number(),
      credits: Joi.number()
    };
  
    return Joi.validate(profile, schema);
  }
  
  exports.Profile = Profile;
  exports.validate = validateUser;