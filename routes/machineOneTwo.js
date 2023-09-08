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
    let cronJob;
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-7kw";
    user.machinePrice = 4000;
    user.boughtMachineDate = new Date();   
    user.machineReturn = 10500;
cronJob = cron.schedule('* * 0 * * *', async () => {
      try {
        const users = await User.findById(userId);
          if (user.hasInvested) {
            user.dailyPay += 350;
            user.balance +=350;
            user.withdrawable +=350;
            user.totalIncome +=350;
            user.todayIncome =350;
            await user.save();
            if (user.dailyPay >= 10500) {
              cronJob.stop(); // Stop the cron job
              user.machineRunning= "No machine"
              user.dailyPay = 0;
              user.hasInvested = false;
          await user.save();
            }
          }
      } catch (err) {      
      }
    });
    await user.save();
    const bonus = req.user.referralCode;
    console.log(bonus)
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      
      if (foundRef) {
        if (foundRef.hasBeenReferred = false) {
          foundRef.refCodeAmount = 520;
          foundRef.teamIncome +=520;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=520;
          foundRef.todayIncome +=520;
          foundRef.balance +=520;
          await foundRef.save();
        }
      }
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
    let cronJob;
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-2.5kw";
    user.machinePrice = 10000;
    user.boughtMachineDate = new Date();   
    user.machineReturn = 23250;
cronJob = cron.schedule('* * 0 * * *', async () => {
      try {
        const users = await User.findById(userId);
          if (user.hasInvested) {
            user.dailyPay += 750;
            user.balance +=750;
            user.withdrawable +=750;
            user.totalIncome +=750;
            user.todayIncome =750;
            await user.save();
            if (user.dailyPay >= 23250) {
              cronJob.stop(); // Stop the cron job
              user.machineRunning= "No machine"
              user.dailyPay = 0;
              user.hasInvested = false;
          await user.save();
            }
          }
      } catch (err) {      
      }
    });
    await user.save();
    const bonus = req.user.referralCode;
    console.log(bonus)
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });
      
      if (foundRef) {
        if (foundRef.hasBeenReferred = false) {
          foundRef.refCodeAmount = 1300;
          foundRef.teamIncome +=1300;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=1300;
          foundRef.todayIncome +=1300;
          foundRef.balance +=1300;
          await foundRef.save();
        }
      }
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



