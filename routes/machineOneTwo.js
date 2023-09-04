const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// machine 1 get

router.get('/machine1',ensureAuthenticated, (req, res, next) => {
    res.render('machine1');
  });

// machine 1 post

// machine 2 get

router.get('/machine2',ensureAuthenticated, (req, res, next) => {
    res.render('machine2');
  });

// machine 2 post


module.exports = router;



