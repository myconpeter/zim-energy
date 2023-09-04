const express = require('express');
const router = express.Router();

// get homepage
router.get('/', (req, res, next) => {
  res.render('index');
});


// get about page

router.get('/about', (req, res, next)=>{
  res.render('about')
})


// get epic page

router.get('/epic', (req, res, next)=>{
  res.render('epic')
})









module.exports = router;
