const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const User = require("../models/user");


// Replace 'your_test_api_key' with your actual Paystack API key
const PAYSTACK_API_KEY = process.env.PAYSTACK_API_KEY || 'sk_live_b54fe9bace0b0f29d5b0ed2b258902da13d55ff7';



router.get('/pay', ensureAuthenticated, (req, res) => {
  res.render('recharge'); // Render the EJS form
});

router.post('/pay', ensureAuthenticated, async (req, res) => {
  const email = req.body.email;
  const amount = req.body.amount;

 const errors = [];

  if ( !email || !amount) {
    errors.push({ msg: 'Please fill in all fields' });
  }

const user = await User.findOne({email: email})

if(!user) {
  errors.push({ msg: 'Incorrect Email. Please check' });
}
  

  if (errors.length > 0) {
   return res.render('recharge', {
      errors: errors,
      email: email,
      amount: amount,
    });
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////
  try {
    // Create a Paystack Payment
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: email,
        amount: amount * 100, 
        currency: 'NGN'  ,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_API_KEY}`,
        },
      }
    );

    
    res.redirect(response.data.data.authorization_url);
  } catch (error) {
   
    console.error(error);
    res.status(500).send('Payment initialization failed.');
  }
});

// Handle successful payment redirect
router.get('/successPage', ensureAuthenticated, (req, res) => {

  res.render('successPage'); 
});



module.exports = router;



