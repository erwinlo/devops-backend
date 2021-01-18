var createError = require('http-errors');
var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors"); //Add THIS LINE - 1

var indexRouter = require('./routes/index');
var banksRouter = require('./routes/banks');
var cpfRouter = require('./routes/cpf');
var investRouter = require('./routes/investments');
var tranRouter = require('./routes/transactions');
var accountsRouter = require('./routes/accounts');
var institutionsRouter = require('./routes/institutions');
var usersRouter = require('./routes/users');
var passwordRouter = require('./routes/password');
var emailRouter = require('./routes/email');
var mobileRouter = require('./routes/mobile');
var loginRouter = require('./routes/login');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //Add THIS LINE - 3
app.use('/', indexRouter);
app.use('/banks', banksRouter);
app.use('/cpf', cpfRouter);
app.use('/investments', investRouter);
app.use('/transactions', tranRouter);
app.use('/accounts', accountsRouter);
app.use('/institutions', institutionsRouter);
app.use('/users', usersRouter);
app.use('/password', passwordRouter);
app.use('/email', emailRouter);
app.use('/mobile', mobileRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
     next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
     // set locals, only providing error in development
     res.locals.message = err.message;
     res.locals.error = req.app.get('env') === 'development' ? err : {};

     // render the error page
     res.status(err.status || 500);
     res.render('error');
});

module.exports = app;
