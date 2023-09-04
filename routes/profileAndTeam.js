const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();


// get profile
router.get('/profile',ensureAuthenticated, (req, res, next)=>{
    res.render('profile')
  })


// get team

router.get('/referral',ensureAuthenticated, (req, res, next)=>{
    res.render('referral')
  })



// get history

router.get('/history',ensureAuthenticated, (req, res, next)=>{
    res.render('history')
  })




module.exports = router;


// get profile



// get team



// get history

