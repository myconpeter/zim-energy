const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const router = express.Router();
const Deposit = require('../models/deposit'); // Import your Deposit model
const User = require('../models/user'); // Import your User model
const mongoose = require('mongoose');


// get withdraw

router.get('/withdraw',ensureAuthenticated, (req, res, next)=>{


    res.render('withdraw')
  })


// post withdraw



router.get('/accountDetails', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 4000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})

router.get('/accountDetails1', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 10000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
     
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})

router.get('/accountDetails2', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 15000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})

router.get('/accountDetails3', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 25000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})

router.get('/accountDetails4', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 60000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
      console.log('Updated User:', updatedUser);
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})

router.get('/accountDetails5', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 120000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})

router.get('/accountDetails6', ensureAuthenticated, (req, res, next)=>{
  const userId = req.user._id; 
  const Amount = 500000; 
  
  async function updateUserAmount() {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { requestedAmount: Amount },
        { new: true, runValidators: true }
      ).exec();
  
      if (!updatedUser) {
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  updateUserAmount(); 
  res.render('accountDetails' )
})






////////////////////////////////////////////////////
////////////////////////////////////////////////////
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





