const express = require('express')
const path = require('path')
const app = express()
const volleyball = require('volleyball')
require('dotenv').config()
//logging middleware
app.use(volleyball)

//body parsing middleware

app.use(express.json())
app.use(express.urlencoded())

//api routes go here
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public')))

//static file serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

//remaining requests with extension (.js, .css, etc) send 404
app.use((req, res, next) => {
  if(path.extname(req.path).length){
    const err = new Error ('Not Found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

//send index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

//error handling
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error")
})

module.exports = app
