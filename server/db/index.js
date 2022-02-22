const db = require('./db')
const User = require('./models/User')

//associations here

module.exports = {
  db,
  models: {
    User
  }
}
