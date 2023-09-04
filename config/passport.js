// const User = require('../models/user');

// const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcrypt');
// const passport = require('passport')

//     passport.use('userLocal', new LocalStrategy
//             ({usernameField: 'email'},(email,password,done)=>{
//             //match user
//             User.findOne({email:email})
//             .then((user)=>{
//                 if(!user){
//                     return done(null,false,{message:'This Email is not registered'});
//                 }
//                 //math passwords
//                 bcrypt.compare(password,user.password,(err,isMatch)=>{
//                     if(err) throw err;
//                     if(isMatch){
//                         return done(null,user);
//                     } else{
//                         return done(null,false,{message: ' Incorrect password!!!'});
//                     }
//                 })
//             })
//             .catch((err)=>{console.log(err)})
//         })
//     )
//     passport.serializeUser(function(user,done) {
//         done(null,user.id);
//     })
//     passport.deserializeUser(function(id,done){
//         User.findById(id,function(err,user){
//             done(err,user);
//         })
//     });



// //===========================================================================================
// //============================================================================================
// //===============================================================================================

const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

passport.use('userLocal', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'This Email is not registered' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password!!!' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(async (user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});




