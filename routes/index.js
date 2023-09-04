const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


// get homepage
router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render('index');
});


// get about page

router.get('/about', ensureAuthenticated,(req, res, next)=>{
  res.render('about')
})


// get epic page

router.get('/epic', ensureAuthenticated, (req, res, next)=>{
  res.render('epic')
})









module.exports = router;
