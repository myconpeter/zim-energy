const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

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


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
















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

// get error page

app.get('*', (req, res, next)=>{
  res.render('error404')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
