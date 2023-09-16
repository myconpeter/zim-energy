const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");



// Route to display referred users
router.get('/referral', ensureAuthenticated, async (req, res) => {
  const userId = req.user.id; 
  const userName = req.user.username;

  try {
    const referredUsers = await User.find(
      {referralCode: userName}
      );

      const referredUsersCount = referredUsers.length;

    res.render('referral', { referredUsers, referredUsersCount  });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});





// get recharge

router.get('/recharge',ensureAuthenticated, (req, res, next)=>{
    res.render('recharge')
  })





module.exports = router;



