const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");
const cron = require('node-cron');

// machine 7 get

router.get('/machine7',ensureAuthenticated, (req, res, next) => {
    res.render('machine7');
  });

// machine 7 post

router.post('/machine7', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 500000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
   
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-kw449max";
    user.machinePrice = 500000;
    user.boughtMachineDate = new Date(); 
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000);
    user.machineReturn = 612500;
    user.counter = 17500;
    user.dailyPay = 0;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/f0vcnPw/product7.jpg";



    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 78000;
          foundRef.teamIncome +=78000;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=78000;
          foundRef.todayIncome +=78000;
          foundRef.balance +=78000;
          foundRef.withdrawable +=78000;
          await foundRef.save();
        }
      }

      user.hasBeenReffered = true;
      await user.save();

      
    }
    req.flash('success_msg', 'You have successfully bought an investment plan!');
    return res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred during the purchase. Please try again.');
    return res.redirect('/profile');
  }
});




module.exports = router;



