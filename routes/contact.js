const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


// productAnd services

router.get('/productAndService',ensureAuthenticated, (req, res, next)=>{
    res.render('productAndService')
  })


// get contact

router.get('/contact',ensureAuthenticated, (req, res, next)=>{
    res.render('contact')
  })



// post contact



module.exports = router;


