const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const DepositSchema  = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
      },

    username : {
        type: String,
        ref: 'User', // Reference the 'User' model
      },

      email : {
        type: String,
        ref: 'User', // Reference the 'User' model
      },

      amount: {
        type: Number,
        default:0
        
      },

      requestedAmount :{
        type: Number,
        ref: 'User',
        
      },

////////////////////////////////////////////////////////////////

depositedDate: {
    type :Date,
},


date :{
    type : Date,
    default :Date.now()
}


});




const Deposit= mongoose.model('Deposit' ,DepositSchema);

module.exports = Deposit;