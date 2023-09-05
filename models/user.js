const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema  = new mongoose.Schema({

fullname :{
      type  : String,
      required : true
  } ,

username :{
    type  : String,
    required : true
} ,
  email :{
    type  : String,
    required : true
} ,
telephone :{
    type  : Number,
    required : true
} ,

refcode :{
    type  : Number,
    required : true
} ,
password :{
    type  : String,
    required : true
} ,

////////////////////////////////////////////////////////////////
refLink :{
    type  : String,
    default :"www.zim-energy.com"
} ,


balance : {
    type: Number, 
    default: 0
    },

assets: {
     type: Number, 
     default: 0
     },

todayIncome: {
        type: Number, 
        default: 0
        },

teamIncome: {
            type: Number, 
            default: 0
            },

totalIncome: {
         type: Number, 
         default: 0
         },




    




machineRunning: {
    type :String,
    default :"No Active Machine Running"
},





date :{
    type : Date,
    default :Date.now()
}


});




const User= mongoose.model('User' ,UserSchema);

module.exports = User;