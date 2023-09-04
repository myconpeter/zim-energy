const express = require('express');
const router = express.Router();

// get referral

router.get('/referral', (req, res, next)=>{
    res.render('referral')
  })


// get recharge

router.get('/recharge', (req, res, next)=>{
    res.render('recharge')
  })





module.exports = router;



