const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fs = require('fs')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/express_app'
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error')); db.once('open', function (callback) {
  console.log('Connection Succeeded')
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
// uncomment after placing our favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })); app.use(cookieParser()); app.use(express.static(path.join(__dirname, 'public')))
// Include controllers
fs.readdirSync('controllers').forEach(function (file) {
  if (file.substr(-3) === '.js') {
    const route = require('./controllers/' + file)
    route.controller(app)
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500); res.render('error')
})

app.listen(8000, function () { console.log('listening on 8000') })

module.exports = app
