// DEPENDENCIES
// ************

const path = require('path')
const express = require('express')

// SERVER CONFIG
// *************

const server = express()
const port = process.env.PORT || 8000 // Using Port 80 will needs sudo
const servePath = path.join(__dirname, 'dist')

// MIDDLEWARE: SERVE STATIC
// ************************

server.use(express.static(servePath))

// START LISTENING
// ***************

server.listen(port, () => console.log(`Express server is up on port ${port}...`))
