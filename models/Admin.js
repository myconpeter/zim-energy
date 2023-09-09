const mongoose = require('mongoose');

const AdminSchema  = new mongoose.Schema({
email :{
    type  : String,
    required : true
} ,
password :{
    type  : String,
    
},

transferAmount: {
    type: Number, 
    default: 100000

    },

    accountNumber: {
        type : Number,
        default: 0
    },

    accountName: {
        type : String,
        default: "none"
    },

    

    bankName: {
        type : String,
        default: "none"
    },



date :{
    type : Date,
    default : Date.now
}
});


const Admin= mongoose.model('Admin',AdminSchema);

module.exports = Admin;