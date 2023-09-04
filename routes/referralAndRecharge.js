const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// get referral

router.get('/referral',ensureAuthenticated, (req, res, next)=>{
    res.render('referral')
  })


// get recharge

router.get('/recharge',ensureAuthenticated, (req, res, next)=>{
    res.render('recharge')
  })





module.exports = router;



