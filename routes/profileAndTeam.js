const express = require('express');
const router = express.Router();


// get profile
router.get('/profile', (req, res, next)=>{
    res.render('profile')
  })


// get team

router.get('/referral', (req, res, next)=>{
    res.render('referral')
  })



// get history

router.get('/history', (req, res, next)=>{
    res.render('history')
  })




module.exports = router;


// get profile



// get team



// get history

