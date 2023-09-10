const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const passport = require ('passport');
const session = require('express-session');
const flash = require("connect-flash");

const PORT  = process.env.PORT || 8000;


const app = express();

//passport config:
require('./config/passport')





// Get all routes

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const changePasswordRoutes = require("./routes/changePassword");
const contactRoutes = require("./routes/contact");
const machineFiveSixRoutes = require("./routes/machineFiveSix");
const machineOneTwoRoutes = require("./routes/machineOneTwo");
const machineThreeFourRoutes = require("./routes/machineThreeFour");
const machineSevenRoutes = require("./routes/machineSeven");
const profileAndTeamRoutes = require("./routes/profileAndTeam");
const referralAndRechargeRoutes = require("./routes/referralAndRecharge");
const withdrawRoutes = require("./routes/withdraw");
const paymentRoutes = require("./routes/paystack")




// view engine setup
app.set('view engine', 'ejs');

// POASSPORT CONFIGURATION
app.use(session({
  secret : 'mycon',
  resave : true,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


















// get error page
mongoose.connect('mongodb+srv://michealpeter040:ExTjmazipXUskLnl@cluster0.q70vu1w.mongodb.net/?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,

 })
 .then(() => console.log('connected to zim user online'))
.catch((err)=> console.log(err)); 


// database connection
// mongoose.connect('mongodb://localhost/zimdb', {
   
//  })
//  .then(() => console.log('connected to zim db'))
// .catch((err)=> console.log(err)); 

app.use(session({
  secret : 'mycon',
  resave : true,
  saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

// req flash
app.use(flash());

app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })



    app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});




// error handler


app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', changePasswordRoutes);
app.use('/', contactRoutes);
app.use('/', machineFiveSixRoutes);
app.use('/', machineOneTwoRoutes);
app.use('/', machineThreeFourRoutes);
app.use('/', machineSevenRoutes);
app.use('/', profileAndTeamRoutes);
app.use('/', referralAndRechargeRoutes);
app.use('/', withdrawRoutes);
app.use('/', paymentRoutes);


app.get('*', (req, res, next)=>{
  res.render('error404')
})


app.listen(PORT, ()=> {
  console.log("zim users running");
});

