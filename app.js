const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sdmRouter = require('./routes/sdm');

const ojsRouter = require('./routes/api/ojs');
const dosenRouter = require('./routes/api/dosen');
const app = express();

const appLayout = require('express-ejs-layouts')
app.use(appLayout)
app.set('layout', './layouts/default')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs'); // template engine
app.engine('html', require('ejs').renderFile); // turn engine to use html

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dosen', sdmRouter);
app.use('/api/ojs', ojsRouter);
app.use('/api/dosen', dosenRouter);

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

// app.listen
module.exports = app;
