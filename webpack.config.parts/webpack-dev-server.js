// DEPENDENCIES
// ************

const { join } = require('path')

// Settings for Webpack-dev-server
const { WDS_HOST, WDS_PORT } = process.env

// WEBPACK-DEV-SERVER
// ******************

const devServer = {
  host: WDS_HOST, // Default: `localhost`
  port: WDS_PORT, // Default: 8080
  open: false, // Automatically open the page in browser
  historyApiFallback: true, // Using HTML5 History API based routing
  overlay: true, // Error overlay to capture compilation related warnings and errors
  contentBase: join(__dirname, 'dist') // Contents not passing through webpack are served directly from this folder
  // proxy: { "/api": "http://my.api/endpoint" } // If using multiple servers, proxy WDS to them
  // header: // Attach custom headers to your requests here
}

// EXPORTS
// *******

module.exports = { devServer }
