const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        maxlength: 10
    },
    role:{
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
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };
  

const User = mongoose.model('users', userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string()
        .required(),
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .required(),
      phone: Joi.string()
        .max(10),
      role: Joi.string(),
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      country: Joi.string(),
      zip: Joi.string()
    };
  
    return Joi.validate(user, schema);
  }
  
  exports.User = User;
  exports.validate = validateUser;