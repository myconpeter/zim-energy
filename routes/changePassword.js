const express = require('express');
const router = express.Router();

// get page
router.get('/changePassword', (req, res, next) => {
    res.render('changePassword');
  });
  

// update password


module.exports = router;



