const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");


// machine 1 get

router.get('/machine1',ensureAuthenticated, (req, res, next) => {
    res.render('machine1');
  });

// machine 1 post


router.post('/machine1', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId); // Find the user by ID

    const price = 4000;

    if (user.balance < price) {
      req.flash('error_msg', 'Your Available Balance is too low for this Machine. Please fund your account.');
      return res.redirect('/profile');
    }

    // Update user information
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-7kw";
    user.dailyPay += 350;
    user.machinePrice = 4000
    user.boughtMachineDate = new Date();
    user.dailyMatureDate = new Date(+new Date() + 24 * 60 * 60 * 1000);
    user.machineReturn = 10500;

    // Save the updated user data
    await user.save();

    const bonus = req.user.refcode;

    // Check if the user has a refcode
    if (bonus) {
      const foundRef = await User.findOne({ username: bonus });

      if (foundRef) {
        // Check if the referrer has already referred others
        if (!foundRef.hasBeenReferred) {
          // Update the referrer's refCodeAmount and set hasBeenReferred to true
          foundRef.refCodeAmount = 520;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;

          await foundRef.save();
        }
      }
    }

    req.flash('success_msg', 'You have successfully bought an investment plan!');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred during the purchase. Please try again.');
    res.redirect('/profile');
  }
});


// machine 2 get

router.get('/machine2',ensureAuthenticated, (req, res, next) => {
    res.render('machine2');
  });

// machine 2 post


module.exports = router;



