const express = require('express');
const router = express.Router();


//login get

router.get('/login', (req, res, next)=>{
    res.render('login')
  })


//login post


//signup get

router.get('/register', (req, res, next)=>{
    res.render('register')
  })


// signup post

// get logout

module.exports = router;

