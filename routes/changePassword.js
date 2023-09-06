const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const User = require('../models/user');


// get page
router.get('/changePassword',ensureAuthenticated, (req, res, next) => {
    res.render('changePassword');
  });
  

// update password
router.post('/changePassword', (req, res)=>{
  var {secret, newpassword }  = req.body
         let errors =[]
         if(newpassword.length < 6 ) {
          errors.push({msg : 'Password atleast 6 characters'})
          }
          if(errors.length > 0 ) {
          res.render('newpassword', {
              errors : errors,
              secret : secret,
              newpassword : newpassword,
          })
           } else {
               User.findOne({secret : secret}, (err, realUser)=>{
                  if(!realUser){
                      req.flash('error_msg' , 'WRONG INFORMATION');
                          res.redirect('/forgetpassword');
                  } else{
                      const idd = realUser.id;
                      bcrypt.genSalt(10,(err,salt)=> 
                      bcrypt.hash(newpassword,salt,
                          (err,hash)=> {
                              if(err) throw err;
                                  //save pass to hash
                                  newpassword = hash;
                                  User.findByIdAndUpdate(idd, {password: newpassword },  function(err, data){
                                      if(err){
                                          console.log(err)
                                      } else {
                                          req.flash('success_msg','You have successfully reset your password please login!');
                                          res.redirect('/login')
                                      }
                                  }); 
                                   }));
                       }
              })
            }
}) ;


module.exports = router;





