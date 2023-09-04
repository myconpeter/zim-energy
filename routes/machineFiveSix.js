const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


// machine 5 get

router.get('/machine5', ensureAuthenticated, (req, res, next) => {
    res.render('machine5');
  });

// machine 5 post

// machine 6 get

router.get('/machine6', ensureAuthenticated, (req, res, next) => {
    res.render('machine6');
  });

// machine 6 post


module.exports = router;



