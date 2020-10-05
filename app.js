var bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routers
var indexRouter = require('./routes/index');
var databaseRouter = require('./routes/database');
var actionsRouter = require('./routes/actions');
var disconnectRouter = require('./routes/disconnect');

var app = express();

app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true
}));

// to fix the Cross Origin Resource Sharing (CORS) bug
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all requests from all origins
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // add these header to other requests
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // allow certain request methods
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routers
app.use('/', indexRouter);
app.use('/database', databaseRouter);
app.use('/actions', actionsRouter);
app.use('/disconnect', disconnectRouter);

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
