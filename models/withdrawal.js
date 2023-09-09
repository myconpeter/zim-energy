const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const WithdrawalSchema  = new mongoose.Schema({
email :{
        type  : String,
        required : true
    } ,

    accountName :{
      type  : String,
      required : true
  } ,
  accountNumber :{
    type  : String,
    required : true
} ,
bankName :{
    type  : String,
    required : true
} ,
withdrawAmount :{
    type  : Number,
    required : true
} ,


date :{
        type : Date,
        default : new Date()
    },

    amount: {
        type: Number,
        default:0
        
      },
user: [ 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
]
});




const Withdrawal= mongoose.model('Withdrawal', WithdrawalSchema);

module.exports = Withdrawal;