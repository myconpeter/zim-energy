const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");
const withdrawal = require("../models/withdrawal");
const Deposit = require("../models/deposit");




// get profile
router.get('/profile',ensureAuthenticated, async(req, res)=>{

  
  const userId = req.user.id;
 

  try {
    const user = await User.findById(userId);
    if(Date.now() >= currentUser.dailyMatureDate){
      user.todayIncome = 0;
      
      await user.save();
    }
    // Your user-related logic here, if needed
  } catch (err) {
    // Handle errors, if any
  }  

  
    res.render('profile')
  })


// get team




// get history

router.get('/history',ensureAuthenticated, (req, res, next)=>{

  


    res.render('history')
  })




module.exports = router;


// get profile



// get team



// get history

