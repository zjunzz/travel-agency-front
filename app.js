var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require('request')

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/login', login);
//

app.post('/login', function(req, res) {
  console.log("calling login");
  console.log("req", JSON.stringify(req.body))
  const options = {
    method: 'POST',
    uri: 'http://ta-login:9001/login',
    encoding: null,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(req.body)
  };
  request(options, function(error, response, body) {
    console.log('request')
    console.log('statusCode:', response && response.statusCode)
    //console.log('response:', JSON.stringify(response.body))
    console.log('body:', JSON.parse(body))
    if (response && response.statusCode == 200) {
      res.send(JSON.stringify(JSON.parse(body)))
    } else {
      res.status(403);
      res.end();
    }
  });
});

app.get('/flights', function(req, res) {
  console.log("calling flights");
  const options = {
    method: 'GET',
    uri: 'http://ta-flight:9002/flights',
    encoding: null,
    headers: {
      'Content-type': 'application/json'
    },
  };
  request(options, function(error, response, body) {
    console.log('request')
    console.log('statusCode:', response && response.statusCode)
    //console.log('body:', JSON.parse(body))
    if (response && response.statusCode == 200) {
      res.send(JSON.stringify(JSON.parse(body)))
    } else {
      res.status(500);
      res.end();
    }
  });
});

app.get('/hotels', function(req, res) {
  console.log("calling hotels");
  const options = {
    method: 'GET',
    uri: 'http://ta-hotel:9003/hotels',
    encoding: null,
    headers: {
      'Content-type': 'application/json'
    },
  };
  request(options, function(error, response, body) {
    console.log('request')
    console.log('statusCode:', response && response.statusCode)
    //console.log('body:', JSON.parse(body))
    if (response && response.statusCode == 200) {
      res.send(JSON.stringify(JSON.parse(body)))
    } else {
      res.status(500);
      res.end();
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
