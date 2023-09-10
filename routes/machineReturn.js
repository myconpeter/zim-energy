const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");
const cron = require('node-cron');


router.post('/machineReturn', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId); // Find the user by ID

    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/profile');
    }

    const pay = req.user.dailyPay;
    const machineReturn = req.user.machineReturn;
    const count = req.user.counter;

    if (user.hasInvested) {
      // Update user's financial details
      user.dailyPay += count;
      user.balance += count;
      user.withdrawable += count;
      user.totalIncome += count;
      user.todayIncome = count;
      user.dailyMatureDate = new Date(+new Date() + 5 * 1000); // 30 days in the future
      user.timesOfRun += 1;

      if (user.dailyPay >= machineReturn) {
        user.machineRunning = "No machine";
        user.dailyPay = 0;
        user.hasInvested = false;
        user.isWithdrawable = true;
      }

      await user.save(); // Save the user's updated information
    } else {
      req.flash('error_msg', 'User has not invested');
    }
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'An error occurred');
  }

  req.flash('success_msg', 'Daily Returns Has Been Processed Sucessfully');
  res.redirect('/profile');
});

module.exports = router;







module.exports = router