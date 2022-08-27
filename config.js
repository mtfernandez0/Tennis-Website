'use strict'

require('dotenv').config()

const url = (content, api_key) =>
`https://api.sportradar.com/tennis/trial/v3/en/${content}.json?api_key=${api_key}`

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tennisdb'

const PORT = process.env.PORT || 3000

const MANTAINER_KEY = process.env.MANTAINER_KEY

module.exports = { url, MONGODB_URI, PORT, MANTAINER_KEY }
