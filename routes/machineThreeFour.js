const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


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
    let cronJob;
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-56kw";
    user.machinePrice = 15000;
    user.boughtMachineDate = new Date();   
    user.machineReturn = 27200;
cronJob = cron.schedule('* * 24 * * *', async () => {
      try {
        const users = await User.findById(userId);
          if (user.hasInvested) {
            user.dailyPay += 900;
            user.balance +=900;
            user.withdrawable +=900;
            user.totalIncome +=900;
            user.todayIncome =900;
            await user.save();
            if (user.dailyPay >= 27200) {
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
          foundRef.refCodeAmount = 1950;
          foundRef.teamIncome +=1950;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=1950;
          foundRef.todayIncome +=1950;
          foundRef.balance +=1950;
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
    let cronJob;
    user.balance -= price;
    user.withdrawable -= price;
    user.hasInvested = true;
    user.machineRunning = "ZE-56kw";
    user.machinePrice = 25000;
    user.boughtMachineDate = new Date();   
    user.machineReturn = 39600;
cronJob = cron.schedule('* * 24 * * *', async () => {
      try {
        const users = await User.findById(userId);
          if (user.hasInvested) {
            user.dailyPay += 1200;
            user.balance +=1200;
            user.withdrawable +=1200;
            user.totalIncome +=1200;
            user.todayIncome =1200;
            await user.save();
            if (user.dailyPay >= 39600) {
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
          foundRef.refCodeAmount = 3250;
          foundRef.teamIncome +=3250;
          foundRef.hasBeenReferred = true;
          foundRef.refCodeBonus = true;
          foundRef.totalIncome +=3250;
          foundRef.todayIncome +=3250;
          foundRef.balance +=3250;
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





// machine 3 get

// machine 3 post

// machine 4 get

// machine 4 post

