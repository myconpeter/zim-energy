const express = require('express');
const bodyParser = require('body-parser');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const multer = require('multer');

const User = require("../models/user");
const Deposit = require("../models/deposit")
const Account = require("../models/acctdetails")
const mongoose = require('mongoose');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

///////////////////////////////////////////////////////////////////////////

function generateRandomAlphaNumeric(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}




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

  user.requestedAmount = amount;
  user.save()

  return res.redirect('/paymentDetails');


/////////////////////////////////////////////////////////////////////////////////////////////////////////

});

// Handle successful payment redirect
router.get('/paymentDetails', ensureAuthenticated, (req, res) => {
  const randomValue = generateRandomAlphaNumeric(10);


  
    // Find all accounts
    
               
                  Account.findOne({})
                  .then(account => {
                    console.log(account.accountName)
                      res.render("paymentDetails", {
                          users: account, // Pass the user data to the view
                          randomValue: randomValue // Pass the random value to the view
                      });
                  })
                  .catch(err => {
                      console.log(err);
                      // Handle the error here (e.g., send an error response)
                  });

});



router.post('/paymentDetails', upload.single('proofImage'), ensureAuthenticated, (req, res) => {

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
}

  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid userId');
  }

  const user =  User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

  

const newDeposit = new Deposit({
  userId: req.user._id,
  username: req.user.username,
  email: req.user.email,
  amount: req.user.requestedAmount,
  narration : req.body.narration,
  senderName : req.body.senderName,
  proofImage: `/uploads/${req.file.filename}` // Store the file path in the database


  // Other deposit-related fields
});


newDeposit.save()
    .then(() => {
        console.log('User saved to database.');
        req.flash('success_msg', 'Thanks, Your deposit is processing');

        res.redirect('/profile');
    })
    .catch(err => console.error('Error saving user to database:', err));




    req.flash('success_msg', 'Thanks, Your deposit is processing');

    res.redirect('/profile');});



module.exports = router;



