// DEPENDENCIES
// ************

require('dotenv').config()
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WDS_HOST, WDS_PORT } = process.env

// WEBPACK CONFIG
// **************

// --- ENTRY / OUTPUT ---
// **********************

const entry = { 
  main: './src/index.js' 
}
const output = {
  filename: 'main.js',
  path: join(__dirname, 'dist')
}

// --- PLUGINS ---
// ***************

const plugins = [
  // Auto-generate index.html
  new HtmlWebpackPlugin({
    title: 'Webpack Demo',
  })
]

// --- LOADERS ---
// ***************

const wbpModule = env => ({
  rules: [{ 
    test: /\.(s)?css$|\.sass$/, // Handle CSS, SASS, and SCSS files
    // include: [], // Must be a RegExp
    exclude: [/node_modules/], // Must be a RegExp
    use: [{ 
      loader: 'style-loader' 
    }, { 
      loader: 'css-loader',
      options: { sourceMap: true }
    }, { 
      loader: 'sass-loader',
      options: { sourceMap: true }
     }]
  }]
})

// --- WEBPACK-DEV-SERVER ---
// **************************

const devServer = {
  host: WDS_HOST, // Defaults to `localhost`
  port: WDS_PORT, // Defaults to 8080
  open: false, // Automatically open the page in browser
  historyApiFallback: true, // Using HTML5 History API based routing
  overlay: true, // Error overlay to capture compilation related warnings and errors
  contentBase: join(__dirname, 'dist') // Contents not passing through webpack are served directly from this folder
  // proxy: { "/api": "http://my.api/endpoint" } // If using multiple servers, proxy WDS to them
  // header: // Attach custom headers to your requests here
}

// EXPORT CONFIG
// *************
// 'process.env' is passed to the function during the build call
// Any other arguments during the call is passed as argv

module.exports = (env, argv) => ({
  mode: env,
  entry, 
  output,
  plugins,
  module: wbpModule(env),
  devServer: env === 'production' ? {} : devServer
})
