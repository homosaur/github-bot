'use strict'

require('dotenv').load({ silent: true })

const glob = require('glob')
const express = require('express')
const bodyParser = require('body-parser')

const captureRaw = (req, res, buffer) => { req.raw = buffer }

const app = express()
app.use(bodyParser.json({ verify: captureRaw }))
require('./lib/github-events')(app)

// load all the files in the scripts folder
glob.sync(process.argv[2] || './scripts/**/*.js').forEach((file) => {
  console.log('loading:', file)
  require(file)(app)
})

module.exports = app
