const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");
const cron = require('node-cron');



// machine 5 get

router.get('/machine1', ensureAuthenticated, (req, res, next) => {
    res.render('machine1');
  });

// machine 5 post

router.post('/machine1', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 4000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
    
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-7kw";
    user.machinePrice = 4000;
    user.boughtMachineDate = new Date();  
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000)
    user.machineReturn = 10500;
    user
    user.dailyPay = 0;
    user.counter = 350;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/pLDzcJJ/product1.jpg";

    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 520;
          foundRef.teamIncome +=520;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=520;
          foundRef.todayIncome +=520;
          foundRef.balance +=520;
          foundRef.withdrawable +=520;
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

// machine 6 get

router.get('/machine2', ensureAuthenticated, (req, res, next) => {
    res.render('machine2');
  });

// machine 6 post

router.post('/machine2', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 10000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
   
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-2.5kw";
    user.machinePrice = 10000;
    user.boughtMachineDate = new Date();   
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000)
    user.machineReturn = 23250;
    user.counter = 750;
    user.dailyPay = 0;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/B4tmsVd/product2.jpg";

    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 1300;
          foundRef.teamIncome +=1300;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=1300;
          foundRef.todayIncome +=1300;
          foundRef.balance +=1300;
          foundRef.withdrawable +=1300;
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



