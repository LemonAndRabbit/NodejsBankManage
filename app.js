// packages
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');

// local middleware
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/login');

const app = express();

// 用于调试：显示请求数据
app.use(logger('dev'));

// 设置模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 设置cookies与session
app.use(expressSession({
  secret: 'secretPass',
  cookie: {maxAge: 200*60*1000}
}));

// 静态文件请求
app.use('/public', express.static(path.join(__dirname, 'public')));

// body 解析
app.use(bodyParser({extended: false}));

// 设置路由
app.use('/', indexRouter);

// catch 404 and error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
