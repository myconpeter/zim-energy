const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');


// get homepage
router.get('/', ensureAuthenticated, async (req, res) => {


  res.render('index');
});

router.get('/welcome', async(req, res) => {
  res.render('welcome')
})


// get about page

router.get('/about', ensureAuthenticated,(req, res, next)=>{
  res.render('about')
})


// get epic page

router.get('/epic', ensureAuthenticated, (req, res, next)=>{
  res.render('epic')
})









module.exports = router;
