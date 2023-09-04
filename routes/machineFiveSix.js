const express = require('express');
const router = express.Router();

// machine 5 get

router.get('/machine5', (req, res, next) => {
    res.render('machine5');
  });

// machine 5 post

// machine 6 get

router.get('/machine6', (req, res, next) => {
    res.render('machine6');
  });

// machine 6 post


module.exports = router;



