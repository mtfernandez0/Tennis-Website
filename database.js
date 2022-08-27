'use strict'

const { MONGODB_URI } = require('./config')
const mongoose = require('mongoose')

mongoose.connect(MONGODB_URI)
  .then(db => console.log('Connected to', db.connection.name))
  .catch(err => console.log(err))

module.exports = { mongoose }
