const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const proifle = require('../routes/profile');
const restaurant = require('../routes/restaurant');
const menuItem = require('../routes/menuItem');
const reviews = require('../routes/reviews');
const itemReviews = require('../routes/itemReviews');
const order = require('../routes/order');
const booking = require('../routes/booking');
const mail = require('../routes/mail');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/profile', proifle);
  app.use('/api/restaurant', restaurant);
  app.use('/api/menuitem', menuItem);
  app.use('/api/reviews', reviews);
  app.use('/api/itemreviews', itemReviews);
  app.use('/api/order', order);
  app.use('/api/booking', booking);
  app.use('/api/mail', mail);
}