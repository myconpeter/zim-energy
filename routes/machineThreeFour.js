const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");
const cron = require('node-cron');


// machine 3 get

router.get('/machine3',ensureAuthenticated, (req, res, next) => {
    res.render('machine3');
  });

// machine 3 post

router.post('/machine3', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 15000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
   
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-56kw";
    user.machinePrice = 15000;
    user.boughtMachineDate = new Date(); 
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000);
    user.machineReturn = 27200;
    user.isWithdrawable = true;  
    user.counter = 900;
    user.dailyPay = 0;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/MZBFvLw/product3.jpg";


    
    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 1950;
          foundRef.teamIncome +=1950;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=1950;
          foundRef.todayIncome +=1950;
          foundRef.balance +=1950;
          foundRef.withdrawable +=1950;
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

// machine 4 get

router.get('/machine4',ensureAuthenticated, (req, res, next) => {
    res.render('machine4');
  });

// machine 4 post

router.post('/machine4', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 25000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
    
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-KW109";
    user.machinePrice = 25000;
    user.boughtMachineDate = new Date(); 
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000);
    user.dailyPay = 0; 
    user.isWithdrawable = true;   
    user.machineReturn = 39600;
    user.counter = 1200;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/MnthdKp/product4.jpg";


    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 3250;
          foundRef.teamIncome +=3250;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=3250;
          foundRef.todayIncome +=3250;
          foundRef.balance +=3250;
          foundRef.withdrawable +=3250;
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


