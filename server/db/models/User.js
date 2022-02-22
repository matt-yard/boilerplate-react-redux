const {Sequelize} = require('sequelize')
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 5

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  }
})

module.exports = User


User.prototype.correctPassword = function(candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT_SECRET)
}

User.authenticate = async function({username, password}) {
  const user = await this.findOne({where: {username}})

  if(!user || !(await user.correctPassword(password))){
    const error = new Error("incorrect username or password")
    error.status = 401
    throw error
  }
  return user.generateToken()
}

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT_SECRET)
    const user = User.findByPk(id)
    if(!user) {
      throw 'noooo'
    }
    return user
  } catch (ex) {
    const error = new Error("bad token")
    error.status = 401
    throw error
  }
}


const hashPassword = async(user) => {
  if(user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS)
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
