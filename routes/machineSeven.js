const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// machine 7 get

router.get('/machine7',ensureAuthenticated, (req, res, next) => {
    res.render('machine7');
  });

// machine 7 post




module.exports = router;



