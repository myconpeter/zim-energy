const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const Deposit = require('../models/deposit'); // Import your Deposit model
const User = require('../models/user'); // Import your User model
const Withdrawal = require('../models/withdrawal'); // Import your User model

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');





// get withdraw

router.get('/withdraw', ensureAuthenticated, (req, res)=>{
  const total = req.user.balance;
  const investment = req.user.withdrawable;
  const Withdrawable = req.user.isWithdrawable
  
  if(investment < 1000){
      req.flash('error_msg' , 'Your current balance is too low, Please fund your account');
          res.redirect('/profile');
      } 
  
      else if (Withdrawable == false){
          req.flash('error_msg' , 'You cannot make withdrawal, Please make an investment');
          res.redirect('/profile');
      }
   
      else if (total < 1000){
          req.flash('error_msg' , 'You cannot withdraw this amount, Please fund your account');
          res.redirect('/profile');
      }else{
          res.render('withdraw') 
      
      }
   
  })


  router.post('/withdraw', ensureAuthenticated, async (req, res) => {
    const { accountName, accountNumber, bankName, withdrawAmount } = req.body;
    const userId = req.user._id;
    let errors = [];
  
    if (!accountName || !accountNumber || !bankName || !withdrawAmount) {
      errors.push({ msg: "Please fill in all fields" });
    }
  
    if (withdrawAmount > req.user.withdrawable) {
      errors.push({ msg: "Enter a valid Amount" });
    }
  
    if (errors.length > 0) {
      res.render('withdraw', {
        errors: errors,
        accountName: accountName,
        accountNumber: accountNumber,
        bankName: bankName,
        withdrawAmount: withdrawAmount,
      });
    } else {
      try {
        const user = await User.findById(userId);
  
        if (!user) {
          errors.push({ msg: 'User not found' });
          res.render('withdraw', {
            errors,
            accountName,
            accountNumber,
            bankName,
            withdrawAmount,
          });
          return;
        }
  
        const userBalance = user.balance;
        const newWithdrawal = new Withdrawal({
          email: user.email,
          accountName: accountName,
          accountNumber: accountNumber,
          bankName: bankName,
          withdrawAmount: withdrawAmount,
          amount: userBalance,
          user: user,
        });
  
        const savedWithdrawal = await newWithdrawal.save();
  
        if (savedWithdrawal) {
          user.balance -= withdrawAmount;
          user.withdrawable -= withdrawAmount;
          await user.save();
          req.flash('success_msg', 'You have Successfully Placed a withdrawal, Your request is processing...');
          res.redirect('/profile');
        } else {
          errors.push({ msg: 'Withdrawal not saved' });
          res.render('withdraw', {
            errors,
            accountName,
            accountNumber,
            bankName,
            withdrawAmount,
          });
        }
      } catch (err) {
        console.error(err);
        errors.push({ msg: 'An error occurred' });
        res.render('withdraw', {
          errors,
          accountName,
          accountNumber,
          bankName,
          withdrawAmount,
        });
      }
    }
  });
  

///////////////////////////////////////////////////
router.post('/accountDetails',ensureAuthenticated, (req, res) => {
  try {
    const userId = req.user._id;
    // console.log('Received userId:', userId);

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid userId');
    }

    // Find the user document based on userId
    const user =  User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
   
    // Create a new deposit record and set the user reference
    const newDeposit = new Deposit({
      userId: req.user._id,
      username: req.user.username,
      email: req.user.email,
      amount: req.user.requestedAmount
      // Other deposit-related fields
    });

     newDeposit.save();

     req.flash('success_msg', 'Thanks, Your deposit is processing');
     res.redirect('/profile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;





