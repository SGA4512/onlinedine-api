var nodemailer = require('nodemailer');
const creds = require('../config/config');
const express = require("express");
const router = express.Router();

var transport = {
    host: 'smtp.gmail.com',
    auth: {
      user: creds.USER,
      pass: creds.PASS
    }
  }
  
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  
  router.post('/orderconfirmation', (req, res, next) => {
  
    var name = req.body.userName;
    var to = req.body.to;
    let orderNumber = req.body.orderNumber;
    let total = req.body.total;
    let restaurantName = req.body.restaurantName;
    var content = `
    Hi ${name} \n 
    Your Receipt: \n
    Order Number: ${orderNumber}\n
    Restaurant Name: ${restaurantName} \n
    Total Amount: $${total}`;
  
    var mail = {
      from: name,
      to: to, 
      subject: `Order Confirmation. Order#${orderNumber}`,
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
  
      console.log(err);
  
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })

  router.post('/reservationconfirmation', (req, res, next) => {
  
    var name = req.body.userName;
    var to = req.body.to;
    let reservationNumber = req.body.reservationNumber;
    let restaurantName = req.body.restaurantName;
    var content = `
    Hi ${name} \n 
    Your Receipt: \n
    Order Number: ${reservationNumber}\n
    Restaurant Name: ${restaurantName} \n`;
  
    var mail = {
      from: name,
      to: to, 
      subject: `Reservation Confirmation. Order#${reservationNumber}`,
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
  
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })
  
  module.exports = router;
  