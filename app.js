var express = require('express'),
 	path = require('path'),
 	logger = require('morgan'),
 	cookieParser = require('cookie-parser'),
 	cookieSession = require('cookie-session'),
 	bodyParser = require('body-parser'),
 	passport = require('passport'),
 	passportSetup = require('./config/passport-setup');

const dotenv = require('dotenv').config();

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var profile = require('./routes/profile');
var logOut = require('./routes/logOut');
var db = require('./config/connect');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Pre routes middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
	name:'session',
	keys:[process.env.cookieKey],
	maxAge:24 * 60 * 60 * 1000
}));

//Passport middleware to initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/profile', profile);
app.use('/log-out', logOut);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
