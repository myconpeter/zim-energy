const express = require('express');
const router = express.Router();

// productAnd services

router.get('/productAndService', (req, res, next)=>{
    res.render('productAndService')
  })


// get contact

router.get('/contact', (req, res, next)=>{
    res.render('contact')
  })



// post contact



module.exports = router;


