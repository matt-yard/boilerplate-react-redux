const usersRouter = require('express').Router()


//mounted on /api/users
usersRouter.get('/', (req, res, next) => {
  res.send({test: 'hello world'})
})

module.exports = usersRouter
