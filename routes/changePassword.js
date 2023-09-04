const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


// get page
router.get('/changePassword',ensureAuthenticated, (req, res, next) => {
    res.render('changePassword');
  });
  

// update password


module.exports = router;



