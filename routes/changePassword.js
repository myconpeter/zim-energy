const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const User = require('../models/user');
const bcrypt = require('bcrypt');


// get page
router.get('/changePassword',ensureAuthenticated, (req, res, next) => {
    res.render('changePassword');
  });
  

// update password

router.post('/changePassword', async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user._id; // Assuming you're using Passport for user authentication

  // Retrieve the user from the database
  const user = await User.findById(userId);

  // Check if the current password is correct
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    req.flash('error_msg', 'Incorrect current password');
    return res.redirect('/changePassword');
  }

  // Check if the new password and confirmation match
  if (newPassword !== confirmPassword) {
    req.flash('error_msg', 'New password and confirmation do not match');
    return res.redirect('/changePassword');
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  user.password = hashedPassword;
  await user.save();

  req.flash('success_msg', 'Password changed successfully');
  res.redirect('/profile'); // Redirect to the user's profile or another appropriate page
});

module.exports = router;






