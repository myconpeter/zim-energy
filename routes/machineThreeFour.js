const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


// machine 3 get

router.get('/machine3',ensureAuthenticated, (req, res, next) => {
    res.render('machine3');
  });

// machine 3 post

// machine 4 get

router.get('/machine4',ensureAuthenticated, (req, res, next) => {
    res.render('machine4');
  });

// machine 4 post


module.exports = router;





// machine 3 get

// machine 3 post

// machine 4 get

// machine 4 post

