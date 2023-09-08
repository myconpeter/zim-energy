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
    let cronJob;
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-KW369";
    user.machinePrice = 60000;
    user.boughtMachineDate = new Date();   
    user.machineReturn = 102000;
cronJob = cron.schedule('* * 0 * * *', async () => {
      try {
        const users = await User.findById(userId);
          if (user.hasInvested) {
            user.dailyPay += 3000;
            user.balance +=3000;
            user.withdrawable +=3000;
            user.totalIncome +=3000;
            user.todayIncome =3000;
            await user.save();
            if (user.dailyPay >= 102000) {
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
          foundRef.refCodeAmount = 7800;
          foundRef.teamIncome +=7800;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=7800;
          foundRef.todayIncome +=7800;
          foundRef.balance +=7800;
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
    let cronJob;
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-KW369";
    user.machinePrice = 120000;
    user.boughtMachineDate = new Date();   
    user.machineReturn = 175000;
cronJob = cron.schedule('* * 0 * * *', async () => {
      try {
        const users = await User.findById(userId);
          if (user.hasInvested) {
            user.dailyPay += 5000;
            user.balance +=5000;
            user.withdrawable +=5000;
            user.totalIncome +=5000;
            user.todayIncome =5000;
            await user.save();
            if (user.dailyPay >= 175000) {
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
          foundRef.refCodeAmount = 15600;
          foundRef.teamIncome +=15600;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=15600;
          foundRef.todayIncome +=15600;
          foundRef.balance +=15600;
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



