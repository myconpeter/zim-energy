const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const DetailsSchema  = new mongoose.Schema({

  accountNumber : {
    type : String,
    default : "no name"
  },
  
  accountName : {
    type : String,
    default : "no name"
  },
  bankName : {
    type : String,
    default : "no name"
  },
  

});




const Details= mongoose.model('Details'
 ,DetailsSchema);

module.exports = Details;