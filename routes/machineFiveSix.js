const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");
const cron = require('node-cron');



// machine 5 get

router.get('/machine5', ensureAuthenticated, (req, res, next) => {
    res.render('machine5');
  });

// machine 5 post

router.post('/machine5', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 60000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
 
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-KW369";
    user.machinePrice = 60000;
    user.boughtMachineDate = new Date(); 
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000);   
    user.machineReturn = 102000;
    user.counter = 3000
    user.dailyPay = 0;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/k4VQqF2/product5.jpg";


    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 7800;
          foundRef.teamIncome +=7800;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=7800;
          foundRef.todayIncome +=7800;
          foundRef.balance +=7800;
          foundRef.withdrawable +=7800;
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

router.get('/machine6', ensureAuthenticated, (req, res, next) => {
    res.render('machine6');
  });

// machine 6 post

router.post('/machine6', ensureAuthenticated, async (req, res) => {
  try {
    const userId = Object(req.user.id);
    const user = await User.findById(userId); // Find the user by ID
    const price = 120000;
    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }
   
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-KW606max";
    user.machinePrice = 120000;
    user.boughtMachineDate = new Date();  
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000);  
    user.machineReturn = 175000;
    user.dailyPay = 0;
    user.counter = 5000;
    user.timesOfRun = 0;
    user.machineImage = "https://i.ibb.co/bPhzysW/product6.jpg";


    await user.save();
    const bonus = req.user.referralCode;
    
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      // console.log(foundRef)
      
      if (foundRef) {
        if (user.hasBeenReffered == false) {
          foundRef.refCodeAmount = 15600;
          foundRef.teamIncome +=15600;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=15600;
          foundRef.todayIncome +=15600;
          foundRef.balance +=15600;
          foundRef.withdrawable +=15600;
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



