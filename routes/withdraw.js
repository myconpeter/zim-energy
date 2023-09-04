const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();

// get withdraw

router.get('/withdraw',ensureAuthenticated, (req, res, next)=>{
    res.render('withdraw')
  })


// post withdraw




module.exports = router;



