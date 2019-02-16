// DEPENDENCIES
// ************

// Required at the very entrance to get the env variables
require('dotenv').config()

const path = require('path')
const express = require('express')

// SERVER CONFIG
// *************

const server = express()
const port = process.env.PORT // Using Port 80 will needs sudo
const servePath = path.join(__dirname, 'dist')

// MIDDLEWARE: SERVE STATIC
// ************************

server.use(express.static(servePath))

// START LISTENING
// ***************

server.listen(port, () => console.log(`Express server is up on port ${port}...`))
