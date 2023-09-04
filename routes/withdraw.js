const express = require('express');
const router = express.Router();

// get withdraw

router.get('/withdraw', (req, res, next)=>{
    res.render('withdraw')
  })


// post withdraw




module.exports = router;



