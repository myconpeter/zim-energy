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

referralCode :{
    type  : String,
    } ,
password :{
    type  : String,
    required : true
} ,

////////////////////////////////////////////////////////////////
referredBy: {
    type: String,
    ref: 'User', // Reference the 'User' model
  },

hasInvested :{
    type  : Boolean,
    default : false
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
         
withdrawable: {
            type: Number, 
            default: 0
            },
   
machineRunning: {
    type :String,
    default :"No machine Running"
},

dailyPay: {
    type :Number,
    default :"0"
},

machinePrice: {
    type :Number,
    default: 0
},

machineReturn: {
    type :Number,
    default :"0"
},

boughtMachineDate: {
    type :Date,
},

hasBeenReffered: {
    type :Boolean,
    default :false
},

refCodeBonus: {
    type :Boolean,
    default : false
},

refCodeAmount: {
    type :Number,
    default : 0
},

dailyMatureDate: {
    type: Date,
},

requestedAmount :{
    type: Number,
    default :0
    
  },

  isWithdrawable :{
    type: Boolean,
    default: false
  },


});




const User= mongoose.model('User' ,UserSchema);

module.exports = User;