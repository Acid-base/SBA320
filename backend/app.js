// app.js - This file sets up your Express.js application
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routes for different parts of your application
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup (tells Express to use Jade for templates)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware - Functions that run before requests reach your routes
app.use(logger('dev')); // Log requests to the console
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Use the imported routes
app.use('/', indexRouter); // Routes starting with '/' use indexRouter
app.use('/users', usersRouter); // Routes starting with '/users' use usersRouter

// Catch 404 (Not Found) errors and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler middleware (for any errors that occur)
app.use(function(err, req, res, next) {
  // Set local variables (available in your error template)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page (likely 'views/error.jade')
  res.status(err.status || 500);
  res.render('error');
});

// Export the configured Express app
module.exports = app;

