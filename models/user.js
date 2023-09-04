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



recievedAmount : {
    type: Number, 
    default: 0
    },

availableBalance: {
     type: Number, 
     default: 0
     },

profit: {
        type: Number, 
        default: 0
        },

affliateBonus: {
            type: Number, 
            default: 0
            },

principle: {
         type: Number, 
         default: 0
         },




    




investPlans: {
    type :String,
    default :"No Active Investment"
},





date :{
    type : Date,
    default :Date.now()
}


});




const User= mongoose.model('User' ,UserSchema);

module.exports = User;