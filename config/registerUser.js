const bcrypt = require('bcrypt');
const User = require('../models/user');

let referredBy = "none";


// ... (Validation and hashing functions remain the same)
function validateInputData(reqBody) {
  const { fullname, username, email, telephone, referralCode, password } = reqBody;
  const errors = [];
  

  if (!fullname || !username || !email || !telephone|| !password) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  if (referralCode) {
    console.log(referralCode);
  
    async function findUser() {
      try {
        const found = await User.findOne({ username: referralCode }).exec();
  
        if (found) {
          referredBy = found.email;
          // User with matching username found
        } else {
          console.log('no user');
          errors.push({ msg: 'Invalid referral code' });
          // No user with matching username found
        }
      } catch (err) {
        console.error(err);
        // Handle any errors that occur during the database query
      }
    }
  
    // Call the async function
    findUser();
  }
  
  
  
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  return errors;

  
}

// Function to hash the user's password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Registration route handler
async function registerUser(req, res) {
  const errors = validateInputData(req.body);
  

  if (errors.length > 0) {
    return res.render('register', {
      errors,
      ...req.body,
    });
  }

  const { email, username, referralCode } = req.body;
  // console.log(email);
  // console.log(username);
  // console.log(referralCode);


  try {
    // const referral = await User.findOne({ username }).exec(); 

    // Check if the email and username are already registered
    const existingEmailUser = await User.findOne({ email }).exec();
    const existingUsernameUser = await User.findOne({username }).exec();

    
    // console.log(referralCode);

    

    if (existingEmailUser) {
      errors.push({ msg: 'Email already registered, please choose another' });
    }

    if (existingUsernameUser) {
      errors.push({ msg: 'Username already registered, please choose another' });
    }

    if (errors.length > 0) {
      return res.render('register', {
        errors,
        ...req.body,
      });
    }

    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({
      ...req.body,
      balance: 200,
      withdrawable: 200,
      totalIncome:200,

      password: hashedPassword,
      referredBy, // Assign the referring user (null if no referral code provided)
    });

    await newUser.save();
    req.flash('success_msg', 'You have now registered, please login');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = registerUser;
